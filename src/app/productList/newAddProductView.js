"use client"

export default function AddProduct() {
    return (
        <>

            {/* Card View */}
            <div className="productCardView p-2" style={{ maxWidth: '18rem'}}>
                <div className="productCardViewBody">
                    <div className="col-12">
                        <div className="row">
                            <div className="addProductBackground"></div>
                        </div>
                    </div>
                </div>
                <div className="productCardViewFooter">
                    <div className="col-12 align-items-center justify-content-center">

                        <div className="container mt-2">
                            <button className="col-12 btn4 p-2" onClick={() => addSingleProductview()}><span className="title10">Add Another Plan</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Card View */}
        </>
    );
}
