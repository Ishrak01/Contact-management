import { apiSlice } from "@/app/Redux/baseApi/apiSlice"


export const contactApi= apiSlice.injectEndpoints({

  tagTypes: ['post','delete'],


  endpoints: (builder)=> ({
    saveContact: builder.mutation({
      query:(data)=> ({
        url: "/saveContact",
        method:'POST',
        body:data
      
       
      }),
      invalidatesTags:['post'],
    
     
    }),

   

    getAllContacts:builder.query({
      query:(data)=>({
        url:"/getAllContacts",
        method:'GET',
        body:data
      }),
      providesTags: ['post','delete'],
     
    }),

    downloadContactsPdf:builder.query({
      query:(data)=>({
        url:"/downloadContactsPDF",
        method:'GET',
        body:data
      }),
      
     
    }),

    deleteContactById:builder.mutation({
      query:(id)=>({
        url:`/deleteContactById/${id}`,
        method:'DELETE',
        body:id
      }),
     
      invalidatesTags: ['delete'],
    }),


  }),
  

})

export const{useSaveContactMutation,useGetAllContactsQuery,useDeleteContactByIdMutation,useDownloadContactsPdfQuery}=contactApi