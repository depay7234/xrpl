const dotenv = require("dotenv")
const { default: mongoose } = require("mongoose")
dotenv.config({path: "./config.env"})
const app = require("./app")


mongoose.connect("mongodb://127.0.0.1:27017/XRPlore")
  .then(() => {
    console.log('Mongoose Connected');
  })
  .catch((e) => {
    console.log('Failed to connect to MongoDB:', e.message);
  });
const port = 4005
app.listen(port, () => {
    console.log(`App running on port : ${port}`)
})



// const { default: mongoose } = require("mongoose")

// const migrateAccounts = async () => {
//     await mongoose.connect('mongodb://127.0.0.1:27017/XRPlore', {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
  
//     const users = await User.find({});
  
//     for (const user of users) {
//       if (typeof user.account === 'string') {
//         user.account = [user.account];
//         await user.save();
//       }
//     }
  
//     console.log('Migration completed');
//     mongoose.disconnect();
//   };
  
//   migrateAccounts().catch(err => console.log(err));





