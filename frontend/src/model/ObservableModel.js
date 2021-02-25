/**
 * This class is an observer
 */
class ObservableModel {
    constructor() {
      this._observers = [];
    }
  
    /**
     * Adds observer
     * @param { the object adding the observer } observer 
     */
    addObserver(observer) {
      this._observers.push(observer);
    }
  
    /**
     * Notify all observers on change
     * @param { the details of the change } changeDetails 
     */
    notifyObservers(changeDetails) {
      this._observers.forEach(observer => {
        observer.update(changeDetails);
      });
    }
  
    /**
     * Removes observer
     * @param { the object removing the observer } observer 
     */
    removeObserver(observer) {
      this._observers = this._observers.filter(o => o !== observer);
    }
  }
  
  export default ObservableModel;