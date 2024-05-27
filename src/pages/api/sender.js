// export default async function handler(req, res) {
//   // Extract user's email from request body
//   const email = req.body.email;

//   // Validate email address
//   if (!email || !email.trim()) {
//     res.status(400).json({ error: "Missing or invalid email address" });
//     return;
//   }

//   // Prepare API request body
//   const requestBody = {
//     email: email,
//   };

//   // Define Sender.net API endpoint URL
//   const apiEndpoint = "https://api.sender.net/v1/subscribers"; // Replace with your actual API endpoint
//   const apiKey =
//     "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiZDNkZTMwM2JmZWQwNWVmMDNjMGJkYTg1YzA3MDFiMWE3ODcwNTBlYTdmODRkNjMwYjI5M2JiZDI3NmI1Mzk1ODFkNzcyZWI3NDQxOGQxMTQiLCJpYXQiOiIxNzE2NTIwNjE0Ljc3OTMyOCIsIm5iZiI6IjE3MTY1MjA2MTQuNzc5MzMyIiwiZXhwIjoiNDg3MDEyMDYxNC43NzY4OTQiLCJzdWIiOiI4ODA0MjEiLCJzY29wZXMiOltdfQ.rJNayE75waNKZKJpPQCx6m3FkYn-KuivEAIKwmI37feJS9KUSM2JM_xjgGYT61tMDfdtxZUXKDR-DDt9rOPHUg";
//   // Set API authorization header with your API key
//   const headers = {
//     Authorization: `Bearer ${apiKey}`, // Replace with your actual API key
//   };

//   try {
//     // Send subscription request to Sender.net API
//     const response = await axios.post(apiEndpoint, requestBody, { headers });

//     if (response.status === 200) {
//       res.status(200).json({ message: "Subscription successful" });
//     } else {
//       console.error(response.data.error);
//       res.status(500).json({ error: "Subscription failed" });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Subscription failed" });
//   }
// }
