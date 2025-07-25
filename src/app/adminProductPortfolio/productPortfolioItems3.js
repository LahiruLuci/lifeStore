/* eslint-disable jsx-a11y/alt-text */
"use client"

import Image from "next/image";

export default function ProductPortfolioItems2() {
    return (
        <>
            {/* <div className="col-12 col-md-6 col-lg-6">
                <div className="row p-3">
                    <div className="offset-3 col-6">
                        <div className="row justify-content-center align-content-center">
                            <div className="HomeProductDetailedImage4 container-fluid"></div>
                            <div className="text-center">
                                <span className="title07">Kaspersky Internet Security Android</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="row">
                            <table>
                                <thead>
                                    <tr className="col-12">
                                        <th className="col8"><br /><br /></th>
                                        <th className="col4"><br /><br /></th>
                                    </tr>
                                </thead>
                                <tbody className="text-start">
                                    <tr className="col-12 rowBg">
                                        <td className="col-8">
                                            <div className="row align-items-center">
                                                <div className="col-2 text-center">
                                                    <i className="bi bi-shield-shaded"></i>
                                                </div>
                                                <div className="col-10">
                                                    <span className="title19">Security</span><br />
                                                    <span className="title20">Rigorous protection technologies</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="col-4 text-center">
                                            <i class="bi bi-check fa-3x checkView"></i>
                                        </td>
                                    </tr>
                                    <tr className="col-12 p-1 rowBg">
                                        <td className="col-8 p-2">
                                            <div className="row align-items-center">
                                                <div className="col-2 text-center">
                                                    <i className="bi bi-emoji-smile-fill"></i>
                                                </div>
                                                <div className="col-10">
                                                    <span className="title19">Simplicity</span><br />
                                                    <span className="title20">Simlifies security - easy to set up and use</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="col-4 text-center">
                                            <i class="bi bi-check fa-3x checkView"></i>
                                        </td>
                                    </tr>
                                    <tr className="col-12 p-1 rowBg">
                                        <td className="col-8 p-2">
                                            <div className="row align-items-center">
                                                <div className="col-2 text-center">
                                                    <i className="bi bi-person-rolodex"></i>
                                                </div>
                                                <div className="col-10">
                                                    <span className="title19">Privacy</span><br />
                                                    <span className="title20">Stops webcam hijacks & hides browsing - on PC & Mac. Blocks phishing</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="col-4 text-center">
                                            <i class="bi bi-check fa-3x checkView"></i>
                                        </td>
                                    </tr>
                                    <tr className="col-12 p-1 rowBg">
                                        <td className="col-8 p-2">
                                            <div className="row align-items-center">
                                                <div className="col-2 text-center">
                                                    <i className="bi bi-search"></i>
                                                </div>
                                                <div className="col-10">
                                                    <span className="title19">Manual Scan</span><br />
                                                    <span className="title20">Manual scanning for malware - for apps & devices</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="col-4 text-center">
                                            <i class="bi bi-check fa-3x checkView"></i>
                                        </td>
                                    </tr>
                                    <tr className="col-12 p-1 rowBg">
                                        <td className="col-8 p-2">
                                            <div className="row align-items-center">
                                                <div className="col-2 text-center">
                                                    <i className="bi bi-gear-wide"></i>
                                                </div>
                                                <div className="col-10">
                                                    <span className="title19">Android Wear</span><br />
                                                    <span className="title20">Support for Android Wear simplifies security management</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="col-4 text-center">
                                            <i class="bi bi-check fa-3x checkView"></i>
                                        </td>
                                    </tr>
                                    <tr className="col-12 p-1 rowBg">
                                        <td className="col-8 p-2">
                                            <div className="row align-items-center">
                                                <div className="col-2 text-center">
                                                    <i className="bi bi-zoom-in"></i>
                                                </div>
                                                <div className="col-10">
                                                    <span className="title19">Automatic Scan</span><br />
                                                    <span className="title20">Automated scanning for malware-for apps & devices</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="col-4 text-center">
                                            <i class="bi bi-check fa-3x checkView"></i>
                                        </td>
                                    </tr>
                                    <tr className="col-12 p-1 rowBg">
                                        <td className="col-8 p-2">
                                            <div className="row align-items-center">
                                                <div className="col-2 text-center">
                                                    <i className="bi bi-person-x"></i>
                                                </div>
                                                <div className="col-10">
                                                    <span className="title19">Anti-Phishing</span><br />
                                                    <span className="title20">Protection against phishing sites & SMS links</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="col-4 text-center">
                                            <i class="bi bi-check fa-3x checkView"></i>
                                        </td>
                                    </tr>
                                    <tr className="col-12 p-1 rowBg">
                                        <td className="col-8 p-2">
                                            <div className="row align-items-center">
                                                <div className="col-2 text-center">
                                                    <i className="bi bi-lock-fill"></i>
                                                </div>
                                                <div className="col-10">
                                                    <span className="title19">Confidentiality</span><br />
                                                    <span className="title20">Locks your key apps with a secret code - plus hide calls, texts & logs from prying eyes</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="col-4 text-center">
                                            <i class="bi bi-check fa-3x checkView"></i>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div> */}
            <div className="col-12 col-md-6 col-lg-6">
                <div className="row p-3">
                    <div className="offset-3 col-6">
                        <div className="row justify-content-center align-content-center">
                        <div className="HomeProductDetailedImage5 container-fluid"></div>
                        <div className="text-center">
                                <span className="title07">Kaspersky Safe Kids</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="row">
                            <table>
                                <thead>
                                    <tr className="col-12">
                                        <th className="col8"><br /><br /></th>
                                        <th className="col4"><br /><br /></th>
                                    </tr>
                                </thead>
                                <tbody className="text-start">

                                    <tr className="col-12 p-1 rowBg">
                                        <td className="col-8 p-2">
                                            <div className="row align-items-center">
                                                <div className="col-2 text-center">
                                                    <i className="bi bi-globe"></i>
                                                </div>
                                                <div className="col-10">
                                                    <span className="title19">Online Content Filter</span><br />
                                                    <span className="title20">Protect your kids from inappropriate websites and content</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="col-4 text-center">
                                            <i class="bi bi-check fa-3x checkView"></i>
                                        </td>
                                    </tr>
                                    <tr className="col-12 p-1 rowBg">
                                        <td className="col-8 p-2">
                                            <div className="row align-items-center">
                                                <div className="col-2 text-center">
                                                    <i className="bi bi-search-heart"></i>
                                                </div>
                                                <div className="col-10">
                                                    <span className="title19">Safe Search in YOUTUBE</span><br />
                                                    <span className="title20">Block your kids youTube search requests deemed harmful</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="col-4 text-center">
                                            <i class="bi bi-check fa-3x checkView"></i>
                                        </td>
                                    </tr>
                                    <tr className="col-12 p-1 rowBg">
                                        <td className="col-8 p-2">
                                            <div className="row align-items-center">
                                                <div className="col-2 text-center">
                                                    <i className="bi bi-file-lock2"></i>
                                                </div>
                                                <div className="col-10">
                                                    <span className="title19">Apps usage Control</span><br />
                                                    <span className="title20">Manage app use by time used, age restrictions or category</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="col-4 text-center">
                                            <i class="bi bi-check fa-3x checkView"></i>
                                        </td>
                                    </tr>
                                    <tr className="col-12 p-1 rowBg">
                                        <td className="col-8 p-2">
                                            <div className="row align-items-center">
                                                <div className="col-2 text-center">
                                                    <i className="bi bi-clock-fill"></i>
                                                </div>
                                                <div className="col-10">
                                                    <span className="title19">Screen Time Mangement</span><br />
                                                    <span className="title20">Protect your kids from inappropriate websites and content</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="col-4 text-center">
                                            <i class="bi bi-check fa-3x checkView"></i>
                                        </td>
                                    </tr>
                                    <tr className="col-12 p-1 rowBg">
                                        <td className="col-8 p-2">
                                            <div className="row align-items-center">
                                                <div className="col-2 text-center">
                                                    <i className="bi bi-clock-history"></i>
                                                </div>
                                                <div className="col-10">
                                                    <span className="title19">Screen Time Scheduling</span><br />
                                                    <span className="title20">Set up exact time periods when screen time should be limited by device</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="col-4 text-center">
                                            <i class="bi bi-check fa-3x checkView"></i>
                                        </td>
                                    </tr>
                                    <tr className="col-12 p-1 rowBg">
                                        <td className="col-8 p-2">
                                            <div className="row align-items-center">
                                                <div className="col-2 text-center">
                                                    <i className="bi bi-battery-half"></i>
                                                </div>
                                                <div className="col-10">
                                                    <span className="title19">Child Locator</span><br />
                                                    <span className="title20">See where your kids go on a map & set a safe area for them to stay in</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="col-4 text-center">
                                            <i class="bi bi-check fa-3x checkView"></i>
                                        </td>
                                    </tr>
                                    <tr className="col-12 p-1 rowBg">
                                        <td className="col-8 p-2">
                                            <div className="row align-items-center">
                                                <div className="col-2 text-center">
                                                    <i className="bi bi-gear-fill"></i>
                                                </div>
                                                <div className="col-10">
                                                    <span className="title19">Battery Tracker</span><br />
                                                    <span className="title20">Get notified when your kids are low on battery so you don`t lose touch</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="col-4 text-center">
                                            <i class="bi bi-check fa-3x checkView"></i>
                                        </td>
                                    </tr>
                                    <tr className="col-12 p-1 rowBg">
                                        <td className="col-8 p-2">
                                            <div className="row align-items-center">
                                                <div className="col-2 text-center">
                                                    <i className="bi bi-binoculars-fill"></i>
                                                </div>
                                                <div className="col-10">
                                                    <span className="title19">Social Network Monitoring</span><br />
                                                    <span className="title20">Track your kids public Facebook activity via My Kaspersky</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="col-4 text-center">
                                            <i class="bi bi-check fa-3x checkView"></i>
                                        </td>
                                    </tr>
                                    <tr className="col-12 p-1 rowBg">
                                        <td className="col-8 p-2">
                                            <div className="row align-items-center">
                                                <div className="col-2 text-center">
                                                    <i className="bi bi-file-earmark"></i>
                                                </div>
                                                <div className="col-10">
                                                    <span className="title19">YOUTUBE Search History</span><br />
                                                    <span className="title20">Discover your kids interests by viewing their YouTube searches</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="col-4 text-center">
                                            <i class="bi bi-check fa-3x checkView"></i>
                                        </td>
                                    </tr>
                                    <tr className="col-12 p-1 rowBg">
                                        <td className="col-8 p-2">
                                            <div className="row align-items-center">
                                                <div className="col-2 text-center">
                                                    <i className="bi bi-exclamation-triangle-fill"></i>
                                                </div>
                                                <div className="col-10">
                                                    <span className="title19">Real - Time Alerts</span><br />
                                                    <span className="title20">Get alert if kids try to access bad sites & apps, leave safe area & more</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="col-4 text-center">
                                            <i class="bi bi-check fa-3x checkView"></i>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
