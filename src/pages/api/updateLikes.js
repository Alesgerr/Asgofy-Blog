// import axios from "axios";

// export default async function handler(request, response) {
//   try {
//     const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
//     const dataSet = process.env.NEXT_PUBLIC_SANITY_DATASET;
//     const token = process.env.NEXT_PUBLIC_SANITY_API_TOKEN;
//     const data = request.body;

//     const mutations = {
//       mutations: [
//         {
//           patch: {
//             _id: data.id,
//             inc: { likes: 1 },
//           },
//         },
//       ],
//     };

//      const apiEndpoint = `https://${projectId}.api.sanity.io/v2023-02-05/data/mutate/${dataSet}`;
//    //  const apiEndpoint = `https://${projectId}.<http://api.sanity.io/v2023-02-05/data/mutate/${dataSet}`;
//     const result = await axios.patch(apiEndpoint, mutations, {
//       headers: {
//         "content-type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     response.status(result.status).json({ message: "Likes increased" });
//   } catch (error) {
//     console.error(error);
//     response.status(500).json({ message: "Server error" });
//   }
// }
