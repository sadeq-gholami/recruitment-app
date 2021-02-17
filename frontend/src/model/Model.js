

class Model extends ObservableModel{
    constructor() {
      super();
      this.firstname;
      this.surname;
      this.email;
      this.dot;
      this.username; //log in 
      this.password; //log in
    }
  

    signup(){
        /* Ej länk klar */
        return fetch("länk", {
            method: 'POST', 
            headers: {
                'Content-Type':'application/json'}, 
                body: JSON.stringify({
                    firstname:this.firstname, 
                    surname: this.surname, 
                    email: this.email, 
                    dot: this.dot, 
                    username: this.username, 
                    password: this.password})
        }).then(response =>{
            return response;
        }).catch(error =>{
            console.error('error', error);
        })
    }

    login(){
        /* Ej klar */
        return fetch("länk", {
            method: 'GET', 
            headers: {
                'Content-Type':'application/json'}, 
                body: JSON.stringify({
                    username: this.username, 
                    password: this.password})
        }).then(response =>{
            return response;
        }).catch(error =>{
            console.error('error', error);
        })

    }

  }
  
  export default Model;