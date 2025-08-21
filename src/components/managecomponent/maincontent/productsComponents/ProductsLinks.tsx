
// import React from 'react';
// import { useAppState } from '@/lib/state';
// import { useWebsiteData } from '@/hooks/use-website-data';
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// import { AlertCircle } from 'lucide-react';

// export const ProductsLinks = () => {
//   const { state } = useAppState();
//   const { selectedWebsiteId } = state;
//   const { getWebsite } = useWebsiteData();

//   // Find the selected website
//   const website = getWebsite(selectedWebsiteId || '');

//   if (!website) {
//     return (
//       <div className="flex items-center justify-center h-full">
//         <Alert className="max-w-lg">
//           <AlertCircle className="h-4 w-4" />
//           <AlertTitle>No Website Selected</AlertTitle>
//           <AlertDescription>
//             Please select a website from the sidebar.
//           </AlertDescription>
//         </Alert>
//       </div>
//     );
//   }

//   // Render products and links content
//   return (
//     <div className="dashboard-container">
//       <h1 className="text-2xl font-bold mb-6">Products & Links</h1>
      
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//         <div className="dashboard-card">
//           <h2 className="text-xl font-semibold mb-4">Products</h2>
//           {website.products && website.products.length > 0 ? (
//             <ul className="space-y-2">
//               {website.products.map((product) => (
//                 <li key={product.id} className="p-3 bg-card hover:bg-accent/10 rounded-md">
//                   {product.title} - {product.currency} {product.price}
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p className="text-muted-foreground">No products added yet.</p>
//           )}
//         </div>
        
//         <div className="dashboard-card">
//           <h2 className="text-xl font-semibold mb-4">Links</h2>
//           {website.links && website.links.length > 0 ? (
//             <ul className="space-y-2">
//               {website.links.map((link) => (
//                 <li key={link.id} className="p-3 bg-card hover:bg-accent/10 rounded-md">
//                   <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
//                     {link.title}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p className="text-muted-foreground">No links added yet.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };
