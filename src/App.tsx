import { useForm } from "react-hook-form";
import './App.css';

function App() {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Identité civil */}
      <input {...register("prenom", { required: true, maxLength: 50 })} />
      <input {...register("nom", { required: true, pattern: /^[A-Za-z]+$/i })} />

      <input type="email" {...register("email", {required: true, pattern: /\S+@\S+\.\S+/ })}/>

      {/* Mot de passe de 10 caractères avec au moins 1 chiffre, des majuscules et minuscules, un caractère spécial */}
      <input type="password" {...register("password", { required: true, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/g})} />
      
      {/* Age minimum requis de 18 ans */}
      <input type="number" {...register("age", { required: true, max: 99, validate: (age) => {if(parseInt(age) < 18) return "Vous êtes mineur, vous ne pouvez pas vous inscrire";
        // if(age === undefined) return true;
      }})} />
      {errors.age && <p>{errors.age.message as string}</p>}
       
      <input type="submit" />
    </form>
  )
}

export default App
