
const contactModel = require('../model/contactModel');


exports.saveContact=async(req,res)=>{
  try {
    const {name,email,phone}=req.body
    if(!name&& !email && !phone){
      return res.send({error:"All fields are required"})
  }
     //exsisting email find
     const exist= await contactModel.findOne({email})
     if(exist){
      return res.status(200).send({message:"Email taken already"})
     }

        //save contact
   const user =new contactModel({name,email,phone})
   await user.save()

   res.status(201).send({message:"contact created successfully",user})


  

  } catch (error) {
    res.json({error:'error'})
  }
}




// Controller function to get all saved contacts
exports.getAllContacts = async (req, res) => {
  try {
    // Query the database to fetch all contacts
    const contacts = await contactModel.find();

    // Respond with the fetched contacts
    res.status(200).send({ contacts });
  } catch (error) {
    // If an error occurs, respond with an error message
    res.status(500).send({ error: 'Failed to fetch contacts' });
  }
};

// Controller function to delete a contact by ID
exports.deleteContactById = async (req, res) => {
  try {
    const contactId = req.params.id; // Get the contact ID from the request parameters

    // Find the contact by ID and delete it
    const deletedContact = await contactModel.findByIdAndDelete(contactId);

    if (!deletedContact) {
      // If the contact with the specified ID is not found, respond with a 404 status code
      return res.status(404).send({ message: 'Contact not found' });
    }

    // Respond with a success message
    res.status(200).send({ message: 'Contact deleted successfully' });
  } catch (error) {
    // If an error occurs, respond with an error message
    res.status(500).send({ error: 'Failed to delete contact', errorMessage: error.message });
  }
};


const PDFDocument = require('pdfkit');
const fs = require('fs');

exports.downloadContactsPDF = async (req, res) => {
  try {
    // Query the database to fetch all contacts
    const contacts = await contactModel.find();

    // Create a new PDF document
    const doc = new PDFDocument();

    // Pipe the PDF document to a write stream
    const pdfStream = fs.createWriteStream('contacts.pdf');
    doc.pipe(pdfStream);

    // Add fetched contacts to the PDF document
    doc.fontSize(12).text('Contacts:\n\n');
    contacts.forEach(contact => {
      doc.text(`Name: ${contact.name}\nEmail: ${contact.email}\nPhone: ${contact.phone}\n\n`);
    });

    // Finalize the PDF document
    doc.end();

    // Respond with the PDF file
    res.status(200).download('contacts.pdf');
  } catch (error) {
    // If an error occurs, respond with an error message
    res.status(500).send({ error: 'Failed to fetch contacts or generate PDF' });
  }
};
