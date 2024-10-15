import { userInstance } from "../Axios/userInstance";

export const userLogin = async (email, password) => {
  try {
    console.log("Welcome to admin login")
    console.log(email,password,userInstance);
    const response = await userInstance.post(`/login`, {
      email,
      password,
    });
    console.log("...........................................")
    console.log("response", response);
    console.log(" response.data", response.data);   
    console.log("response.data.msg", response.data.msg);
    console.log("........................................")
    return response
  } catch (err) {
    console.log("Error in admin login", err);  
    return err
  } 
};

export const userSignUp = async (email,password,confirmPassword,mobile) => {
    try {
      console.log("Welcome to user signup")
      console.log(email,password,confirmPassword,mobile);
      const response = await userInstance.post(`/signup`, {
        email,password,confirmPassword,mobile
      });
      console.log("...........................................")
      console.log("response", response);
      console.log(" response.data", response.data);   
      console.log("response.data.msg", response.data.msg);
      console.log("........................................")
      return response
    } catch (err) {
      console.log("Error in admin login", err);  
      return err
    } 
  };






export const getIndividualUserData = async () => {
    try {
     
      const response = await userInstance.get(`/individualdata`, {
        
      });
      console.log("...........................................")
      console.log("response", response);
      console.log(" response.data", response.data);   
      console.log("response.data.msg", response.data.msg);
      console.log("........................................")
      return response
    } catch (err) {
      console.log("Error in admin login", err);  
      return err
    } 
  };
