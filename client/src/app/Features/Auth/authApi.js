import { apiSlice } from "@/app/Redux/baseApi/apiSlice";
import { userLoggedIn } from "./authSlice";


export const authApi= apiSlice.injectEndpoints({

  tagTypes: ['contact'],


  endpoints: (builder)=> ({
 

   

    

   

    registerController:builder.mutation({
      query:(data)=>({
        url:'/registerController',
        method:'POST',
        body:data
      }),
     
    }),


    loginController:builder.mutation({
      query:(data)=>({
        url:'/loginController',
        method:'POST',
        body:data
      }),
      async onQueryStarted(args,{queryFulfilled,dispatch}){

       

        try {
          const result = await queryFulfilled;
        
          // Check if the result contains a valid token
          if (result.data && result.data.token) {
            localStorage.setItem("auth", JSON.stringify({
              token: result.data.token,
              user: result.data.user,
            }));
        
            dispatch(userLoggedIn({
              token: result.data.token,
              user: result.data.user,
            }));
          } else {
            // Handle the case where the login was not successful
            console.error("Login failed. Invalid token received.");
            // You can dispatch an action to handle the failed login state if needed
            // dispatch(handleLoginError());
          }
  
  
  
        } catch (error) {
          
        }
      }
    }),

    

    

  }),
  

})

export const{useGetAllContactsQuery,useDeleteContactByIdMutation,useRegisterControllerMutation,useLoginControllerMutation}=authApi