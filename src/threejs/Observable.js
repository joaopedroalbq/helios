class Observable {

  constructor(subject) {
    this.subject = subject
    this.observers = []
    this.listen()
  }

  subscribe(observersList) {
    observersList.forEach(o => this.observers.push(o))
  }

  unsubscribe(object) {
    this.observers = this.observers.filter(subscriber => subscriber !== object)
  }

  notify(detail) {
    this.observers.forEach(observer => observer.updateProperties({ [this.subject]: detail }))
  }

  listen() {
    window.addEventListener(this.subject, event => this.notify(event.detail))
  }

}

export default Observable