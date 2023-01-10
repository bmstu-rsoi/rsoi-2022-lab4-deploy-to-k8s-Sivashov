class CircuitBreaker {
    constructor(request, options) {
        const defaults = {
          failureThreshold: 3,
          successThreshold: 2,
          timeout: 6000,
          fallback: null
        }
        Object.assign(this, defaults, options, {
          /* 3 */
          request: request,
          state: "CLOSED",
          failureCount: 0,
          successCount: 0,
          nextAttempt: Date.now()
        })
      }
  
    async fire() {
      // Logic to fire the request
      if (this.state === "OPEN") {
        if (this.nextAttempt <= Date.now()) {
          this.state = "HALF"
        } else {
          //throw new Error("Circuit is currently OPEN")
          console.log("Circuit is currently OPEN")
        }
      }
      // означает, что обрабатывается CLOSED
      try {
        const response = await this.request()
        return this.success(response)
      } catch (err) {
        return this.fail(err)
      }
    }
  
    success(response) {
      // Logic to handle successful requests
      if (this.state === "HALF") {
        this.successCount++
        // если кол-во успешных запросов больше ограничения
        // то меняем состояние, чтобы снова проверить сервис
        if (this.successCount > this.successThreshold) {
          this.successCount = 0
          this.state = "CLOSED"
        }
      }
     
      this.failureCount = 0
      
      return response
    }
  
    fail(err) {
      // Logic to handle failed requests
        this.failureCount++
        if (this.failureCount >= this.failureThreshold) {
            this.state = "OPEN"
            this.nextAttempt = Date.now() + this.timeout
        }
        this.status("Failure")
        if (this.fallback) return this.tryFallback() /* 1 */
        return err
    }

    status(action) {
        console.table({
          Action: action,
          Timestamp: Date.now(),
          Successes: this.successCount,
          Failures: this.failureCount,
          "Next State": this.state
        })
      }
    
    async tryFallback() {
    // Attempting fallback request
        try {
            const response = await this.fallback()
            return response
        } catch (err) {
            return err
        }
    }
  }

  module.exports = CircuitBreaker