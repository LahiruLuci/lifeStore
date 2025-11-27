// // "use client"
// // import ProductPortfolioItems1 from './productPortfolioItems1';
// // import ProductPortfolioItems3 from './productPortfolioItems3';

// // export default function ProductPortfolio() {
// //     return (
// //         <>
// //             <div className="col-12 p-3 bg-white">
// //                 <h1>
// //                     <span className="title06">COMPARE PRODUCTS</span>
// //                 </h1>
// //             </div>
// //             <div className="container-fluid align-content-center justify-content-between">
// //                 <div className="col-12">
// //                     <div className="row p-3 justify-content-center">
// //                         <div className="col-12">
// //                             <div className="row">
// //                                 <ProductPortfolioItems1 />
// //                             </div>
// //                         </div>
// //                     </div>
// //                 </div>
// //                 <div className="col-12">
// //                     <div className="row p-3 justify-content-center">
// //                         <div className="col-12">
// //                             <div className="row">
// //                                 <ProductPortfolioItems3 />
// //                             </div>
// //                         </div>
// //                     </div>
// //                 </div>
// //             </div >
// //         </>
// //     );
// // }




// "use client";
// import ProductPortfolioItems1 from "./productPortfolioItems1";
// import ProductPortfolioItems3 from "./productPortfolioItems3";
// import Image from "next/image";

// export default function ProductPortfolio() {
//   return (
//     <>
//       <div className="col-12 p-3 bg-white">
//         <h1>
//           <span className="title06">COMPARE PRODUCTS</span>
//         </h1>
//       </div>

//       <div className="container-fluid align-content-center justify-content-between">
//         <div className="col-12">
//           <div className="row p-3 justify-content-center">
//             <div className="col-12">
//               <div className="row">
//                 <ProductPortfolioItems1 />
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="col-12">
//           <div className="row p-3 justify-content-center">
//             <div className="col-12">
//               <div className="row">
//                 <ProductPortfolioItems3 />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Feature Comparison Table */}
//         <div className="col-12">
//           <div className="row p-3 justify-content-center">
//             <div className="col-12">
//               <div className="row justify-content-center">
//                 {/* Added mb-5 for spacing below image */}
//                 <div className="col-12 col-lg-10 mb-5">
//                   <Image
//                     src="/img/kaspersky-comparison-table.jpeg"
//                     alt="Kaspersky Product Feature Comparison Table"
//                     width={1200}
//                     height={800}
//                     className="img-fluid"
//                     priority={false}
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Extra spacer to ensure a bigger gap before the footer */}
//           <div className="row">
//             <div className="col-12" style={{ height: "100px" }} />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

//2025/11/27 new update



"use client";
import ProductPortfolioItems1 from "./productPortfolioItems1";
import ProductPortfolioItems3 from "./productPortfolioItems3";

export default function ProductPortfolio() {
  return (
    <>
      {/* ======= CLEAN HEADING ======= */}
      <div className="compareTitleWrapper">
        <h1 className="compareTitle">COMPARE PRODUCTS</h1>
      </div>

      <div className="container-fluid align-content-center justify-content-between">
        
        {/* Product Portfolio Section 1 */}
        <div className="col-12">
          <div className="row p-3 justify-content-center">
            <div className="col-12">
              <div className="row">
                <ProductPortfolioItems1 />
              </div>
            </div>
          </div>
        </div>

        {/* Product Portfolio Section 2 */}
        <div className="col-12">
          <div className="row p-3 justify-content-center">
            <div className="col-12">
              <div className="row">
                <ProductPortfolioItems3 />
              </div>
            </div>
          </div>
        </div>

        {/* Extra spacing before footer */}
        <div className="row">
          <div className="col-12" style={{ height: "80px" }} />
        </div>
      </div>

      {/* =============================
              CSS STYLES
        ============================= */}
      <style jsx>{`
        /* ========== CLEAN TITLE ========== */
        .compareTitleWrapper {
          text-align: center;
          margin-top: 30px;
          margin-bottom: 20px;
        }

        .compareTitle {
          font-size: 2.2rem;
          font-weight: 800;
          color: #003366;
          letter-spacing: 1px;
          text-transform: uppercase;
          text-shadow: 0px 2px 5px rgba(0, 0, 0, 0.15);
        }

        /* Mobile */
        @media (max-width: 768px) {
          .compareTitle {
            font-size: 1.6rem;
          }
        }
      `}</style>
    </>
  );
}
