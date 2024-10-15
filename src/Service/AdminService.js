import { adminInstance } from "../Axios/adminInstance";

export const adminLogin = async (email, password) => {
  try {
    console.log("Welcome to admin login")
    console.log(email,password,adminInstance);
    const response = await adminInstance.post(`/login`, {
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
export const getAllUserData = async () => {
  try {
    
    const response = await adminInstance.get(`/getusers`, {
 
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

export const UserAction = async (id) => {
  try {
    
    const response = await adminInstance.post(`/useraction`, {id:id
 
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
export const editUserData = async (id) => {
  try {
    
    const response = await adminInstance.post(`/useraction`, {id:id
 
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


export const updateUserData = async (id,userData) => {
  try {
    console.log("userdata",id,userData)
    const response = await adminInstance.post(`/userupdate/${id}`, {userData:userData
 
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