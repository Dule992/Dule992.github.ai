import { useForm } from "react-hook-form";
import HCaptcha from '@hcaptcha/react-hcaptcha';

export default function ContactForm() {
  const { register, handleSubmit, setValue } = useForm();
  
  const onHCaptchaChange = (token) => {
    setValue("h-captcha-response", token);
  };
  
  const onSubmit = async (data) => {
    console.log(data);
    
    await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: data
    }).then((res) => res.json());
  }

return (
  <form onSubmit={handleSubmit(onSubmit)}>
     {/* // other form fields */}
      <HCaptcha
         sitekey="50b2fe65-b00b-4b9e-ad62-3ba471098be2"
         reCaptchaCompat={false}
         onVerify={onHCaptchaChange} 
      /> 
  </form>
)}