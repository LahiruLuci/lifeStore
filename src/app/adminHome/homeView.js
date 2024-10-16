"use client"
import Products from "./productView";
import { getProductsProps } from "./productView";

import { useEffect, useState } from "react";

export default function HomeView() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    //load products
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const result = await getProductsProps();
                setProducts(result.props.products);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    //go to new products descriptions
    const homeSeeMoreBtn = () =>{
        const adminHomeId = document.getElementById("adminHomeId");
        const adminProductDescriptionHomeId = document.getElementById("adminProductDescriptionHomeId");
        adminHomeId.classList.add("d-none");
        adminProductDescriptionHomeId.classList.remove("d-none");
    }

    return (
        <>
            <div className="container-fluid align-content-center justify-content-between p-0">
                <div className="col-12">
                    <div className="text-black row">
                        <div className="col-12">
                            <div className="row">
                                <div className="col-12 col-lg-6 p-5 pt-2">
                                    <div className="raw p-5">
                                        <div className="col-12 mb-4">
                                            <span className="homeTitleHead1">KASPERSKY </span><span className="homeTitleHead2">INTERNET
                                                SECURITY</span>
                                        </div>
                                        <div className="col-12 mb-4">
                                            <span className="homeDescription mb-2">Keep your internet use safe and private and your
                                                devices running smoothly with one of our award-winning, easy-to-use security
                                                plans.</span>
                                        </div>
                                        <div className="col-12 mb-4">
                                            <div className="row align-items-center" onClick={homeSeeMoreBtn}>
                                                <div className="seeMoreBtn col-5"><span className="seeMoreBtn">See more</span></div>
                                            </div>
                                        </div>
                                        <label className="sr-only" for="inlineFormInputGroupUsername2">Search...</label>
                                        <div className="input-group mr-sm-2">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text"><i className="bi bi-search"></i></div>
                                            </div>
                                            <input type="text" className="form-control" id="inlineFormInputGroupUsername2"
                                                placeholder="Search your broadband ID" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 d-none d-lg-block">
                                    <div className="row">
                                        <div className="homeBackground1"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 ourProductBox">
                            <div className="row p-5">
                                <div className="col-12 p-4 mb-2 text-center">
                                    <span className="homeTitleHead3">OUR PRODUCTS</span><br />
                                </div>
                                {loading ? <p>Loading...</p> : <Products products={products} />}
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="row p-5">
                                <div className="col-12 text-center">
                                    <span className="homeTitleHead3">HOW IT WORKS</span>
                                </div>
                                <div className="col-12 p-5">
                                    <span className="homeDescriptionText">Internet security works by employing a combination of technologies and best practices to protect users from various online threats. Security software like Kaspersky scans files, emails, and websites for malicious code, detecting and neutralizing viruses, trojans, ransomware, and other malware before they can cause harm. Firewalls monitor and control network traffic, acting as barriers between trusted and untrusted networks to block unauthorized access. Safe browsing features protect users from visiting dangerous websites, while email and phishing protection filters out suspicious emails and attachments, identifying and blocking fake websites that attempt to steal personal information. A Virtual Private Network (VPN) encrypts internet connections, making it difficult for hackers to intercept data and providing anonymity by hiding IP addresses. Regular updates ensure that security software can defend against the latest threats by including new virus definitions and improved detection algorithms. Behavioral analysis detects unusual activities on devices, blocking potential malware even if its not in the virus database. Additionally, parental controls allow parents to monitor and control their children internet usage, protecting them from inappropriate content and online predators. By combining these technologies and practices, internet security systems create a multi-layered defense that significantly reduces the risk of cyber attacks and ensures safe online activities.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
