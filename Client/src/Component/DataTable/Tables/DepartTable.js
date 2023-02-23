// import react from "react";
// import { Link } from "react-router-dom";

// export default function Departtable(departements,chefs) {
//     console.log(departements);

//     return (
        
//         <table>
//         <thead>
//           <tr>
//             <th>Nom</th>
//             <th>description</th>
//             <th>Date de Creation</th>
//             <th>Chef de departement</th>
//             <th>modify</th>
//           </tr>
//         </thead>
//         <tbody>
//           {departements.map((departement) => (
//             <tr key={departement._id}>
//               <td>{departement.Nom}</td>
//               <td>
//                 {departement.description.length > 50
//                   ? departement.description.substring(0, 50) + "..."
//                   : departement.description}
//               </td>

//               <td>{departement.Date_Creation.substring(0, 10)}</td>
//               <td>
//                 {chefs[departement._id] ? chefs[departement._id] : ""}
//               </td>
//               <td>
//                 <Link
//                   className="btn btn-primary"
//                   to={"/modify/departement/" + departement._id}
//                 >
//                   modify
//                 </Link>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     );
// }

