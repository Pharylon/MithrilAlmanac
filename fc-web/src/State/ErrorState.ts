import { observable } from "mobx";

interface IErrorState {
  errorMessage: string;
}

const ErrorState = observable<IErrorState>({
  errorMessage: "",
  
});



export default ErrorState;
