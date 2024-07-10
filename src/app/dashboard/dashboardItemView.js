/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import Image from 'next/image';
import PropTypes from 'prop-types';

const Items = ({ items }) => {
    if (!items || !Array.isArray(items) || items.length === 0) {
        return <p>No items available</p>;
    } else {

        return (
            <>
                {items.map((item) => (
                    <div className="col-12 col-sm-8 col-md-6 col-lg-3" key={item.PRODUCTID}>
                        <div className="cardView mb-3" style={{height:"22rem"}}>
                            <div className="cardViewHeaderBorder">
                                <div className="row">
                                    <div className="cardViewHeaderTitle text-center"><span className="cardViewHeader">{item.PRODUCTNAME}</span></div>
                                    <Image src={`${process.env.NEXT_PUBLIC_URL2+item.IMAGELOCATION}`} alt="No picture" className="itemProductBackground offset-4 col-4 offset-lg-3 col-lg-6" width={600} height={600} />
                                </div>
                            </div>
                            <div className="cardViewHeader"><span className="cardViewHeader">Total Purchases</span></div>
                            <div className="cardViewBody">
                                <div className="cardViewTitle"><span className="cardViewTitle">{item.SUBSCRIPTIONCOUNT}</span></div><br />
                                <p className="cardViewText"><span className="cardViewText"> {item.TODAYSUBSCRIPTIONCOUNT} Today</span></p>
                            </div>
                        </div>
                    </div>
                ))}
            </>
        );
    }

};

Items.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            PRODUCTID: PropTypes.number.isRequired,
            PRODUCTNAME: PropTypes.string.isRequired,
            IMAGELOCATION: PropTypes.string.isRequired,
            SUBSCRIPTIONCOUNT: PropTypes.number.isRequired,
            TODAYSUBSCRIPTIONCOUNT: PropTypes.number.isRequired,
        })
    ).isRequired,
    onItemClick: PropTypes.func.isRequired,
};

export default Items;
