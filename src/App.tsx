import { useForm } from "react-hook-form";
import './App.css';

function App() {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Identité civil */}
      <label htmlFor="prenom">Prénom</label>
      <input id="prenom" {...register("prenom", { required: true, maxLength: 50 })} />

      <label htmlFor="nom">Nom</label>
      <input id="nom"{...register("nom", { required: true, pattern: /^[A-Za-z]+$/i })} />

      <label htmlFor="email">Email</label>
      <input id="email" type="email" {...register("email", { required: true, pattern: /\S+@\S+\.\S+/ })} />

      {/* Mot de passe de 10 caractères avec au moins 1 chiffre, des majuscules et minuscules, un caractère spécial */}
      <label htmlFor="password">Votre mot de passe</label>
      <input id="password" type="password" {...register("password", { 
        required: true, 
        pattern: { 
          value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/, 
          message: "Le mot de passe doit faire au moins 10 caractères et contenir une minuscule, une majuscule, un chiffre et un caractère spécial (parmi @ $ ! % * ? &)." }
          }
          )} />

      {/* Age minimum requis de 18 ans */}
      <label htmlFor="age">Âge</label>
      <input id="age" type="number" {...register("age", {
        required: "Vous devez indiquer votre âge", max: 99, validate: (age) => {
          if (parseInt(age) < 18) return "Vous êtes mineur, vous ne pouvez pas vous inscrire";
        }
      })} />
      {errors.password && <p>{errors.password.message as string}</p>}
      {errors.age && <p>{errors.age.message as string}</p>}

      <input type="submit" />
    </form>
  )
}

export default App
