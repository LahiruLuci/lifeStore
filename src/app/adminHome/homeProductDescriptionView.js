"use client"

export default function HomeProductDescriptionView() {

    const backToadminHome = () =>{
        const adminHomeId = document.getElementById("adminHomeId");
        const adminProductDescriptionHomeId = document.getElementById("adminProductDescriptionHomeId");
        adminHomeId.classList.remove("d-none");
        adminProductDescriptionHomeId.classList.add("d-none");
    }

    return (
        <div className="mb-5">
            <div className="col-12 mt-3 mb-1 p-5 pb-0">
                <span className="title21" onClick={backToadminHome}><i class="bi bi-arrow-bar-left fs-1"></i>&nbsp;</span><span className="aboutTitleHead1">KASPERSKY </span><span className="aboutTitleHead2">INTERNET
                    SECURITY</span><br /><br /><br />
            </div>
            <div className="col-12">
                <div className="container align-items-center justify-content-center">
                    <div className="col-12 p-3 d-none d-lg-block">
                        <div className="row justify-content-center align-items-center">
                            <div className="col-12 col-lg-4">
                                <div className="HomeProductDetailedImage1"></div>
                            </div>
                            <div className="col-12 col-lg-8">
                                <div className="row justify-content-center">
                                    <div className="col-12 about">
                                        <span className="aboutText01 text-center"><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Kaspersky
                                            Standard</b></span>
                                        <span className="text-center">
                                            &nbsp;&nbsp;&nbsp; is tailored
                                            for users seeking fundamental yet effective security for their devices. It provides
                                            essential features such as real-time antivirus protection, safeguarding against
                                            viruses, malware, Trojans, and ransomware. Additionally, it includes safe
                                            browsing capabilities to protect against harmful websites and downloads, and
                                            anti-phishing measures to secure your identity and finances from online threats.
                                            The package also covers firewall, network, and Wi-Fi protection to monitor and
                                            defend against unauthorized access. Performance optimization features ensure
                                            your PC runs smoothly, while tools like device space cleanup and game mode
                                            enhance user experience by managing storage and minimizing interruptions.
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 p-3 d-none d-lg-block">
                        <div className="row justify-content-center align-items-center">
                            <div className="col-12 col-lg-8">
                                <div className="row justify-content-center">
                                    <div className="col-12 about">
                                        <span className="aboutText02 text-center"><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Kaspersky
                                            Plus</b></span><span
                                                className="text-center">&nbsp;&nbsp;&nbsp; builds on the
                                            Standard package by incorporating additional privacy and performance tools. Besides
                                            the core security features, Plus includes an unlimited VPN to secure online
                                            activities
                                            and prevent data interception, even on public Wi-Fi. It offers performance
                                            enhancements such as device space cleanup and game mode, ensuring a seamless and
                                            efficient user experience. The addition of a data leak checker helps monitor the
                                            internet and dark web for any compromised personal information. Plus also
                                            includes advanced tools like webcam and microphone protection, and app
                                            management to keep applications updated and secure. This package is ideal for
                                            users who need comprehensive security and privacy without compromising
                                            performance. </span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-lg-4">
                                <div className="HomeProductDetailedImage2"></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 p-3 d-none d-lg-block">
                        <div className="row justify-content-center align-items-center">
                            <div className="col-12 col-lg-4">
                                <div className="HomeProductDetailedImage3"></div>
                            </div>
                            <div className="col-12 col-lg-8">
                                <div className="row justify-content-center">
                                    <div className="col-12 about">
                                        <span className="aboutText03 text-center"><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Kaspersky
                                            Premium</b></span><span
                                                className="text-center">&nbsp;&nbsp;&nbsp; offers the
                                            most extensive set of features, providing top-tier security, privacy, and support
                                            services. It includes all the features of the Plus package, with additional benefits
                                            like a
                                            premium password manager and identity protection tools. The package offers
                                            unique features such as stalkerware detection, notifying users about potentially
                                            harmful apps on their devices. Premium users also benefit from advanced parental
                                            controls, ensuring children online safety, and smart home device monitoring to
                                            guard against intrusions. Additionally, premium services include remote IT
                                            support, expert installation, priority support, and PC health checks, ensuring
                                            comprehensive assistance and optimal device performance. Kaspersky Premium is
                                            designed for users who require the highest level of security, privacy, and
                                            personalized support.</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 p-3 d-lg-none d-block">
                        <div className="row justify-content-center align-items-center">
                            <div className="col-12 col-lg-4">
                                <div className="row justify-content-center">
                                    <div className="HomeProductDetailedImage1"></div>
                                </div>
                            </div>
                            <div className="col-12 col-lg-8">
                                <div className="row justify-content-center">
                                    <div className="col-12 about">
                                        <span className="aboutText01 text-center"><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Kaspersky
                                            Standard</b></span>
                                        <span className="text-center">
                                            &nbsp;&nbsp;&nbsp; is tailored
                                            for users seeking fundamental yet effective security for their devices. It provides
                                            essential features such as real-time antivirus protection, safeguarding against
                                            viruses, malware, Trojans, and ransomware. Additionally, it includes safe
                                            browsing capabilities to protect against harmful websites and downloads, and
                                            anti-phishing measures to secure your identity and finances from online threats.
                                            The package also covers firewall, network, and Wi-Fi protection to monitor and
                                            defend against unauthorized access. Performance optimization features ensure
                                            your PC runs smoothly, while tools like device space cleanup and game mode
                                            enhance user experience by managing storage and minimizing interruptions.
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 p-3 d-lg-none d-block">
                        <div className="row justify-content-center align-items-center">
                            <div className="col-12 col-lg-4">
                                <div className="row justify-content-center">
                                    <div className="HomeProductDetailedImage2"></div>
                                </div>
                            </div>
                            <div className="col-12 col-lg-8">
                                <div className="row justify-content-center">
                                    <div className="col-12 about">
                                        <span className="aboutText02 text-center"><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Kaspersky
                                            Plus</b></span><span
                                                className="text-center">&nbsp;&nbsp;&nbsp; builds on the
                                            Standard package by incorporating additional privacy and performance tools. Besides
                                            the core security features, Plus includes an unlimited VPN to secure online
                                            activities
                                            and prevent data interception, even on public Wi-Fi. It offers performance
                                            enhancements such as device space cleanup and game mode, ensuring a seamless and
                                            efficient user experience. The addition of a data leak checker helps monitor the
                                            internet and dark web for any compromised personal information. Plus also
                                            includes advanced tools like webcam and microphone protection, and app
                                            management to keep applications updated and secure. This package is ideal for
                                            users who need comprehensive security and privacy without compromising
                                            performance. </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 p-3 d-lg-none d-block">
                        <div className="row justify-content-center align-items-center">
                            <div className="col-12 col-lg-4">
                                <div className="row justify-content-center">
                                    <div className="HomeProductDetailedImage3"></div>
                                </div>
                            </div>
                            <div className="col-12 col-lg-8">
                                <div className="row justify-content-center">
                                    <div className="col-12 about">
                                        <span className="aboutText03 text-center"><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Kaspersky
                                            Premium</b></span><span
                                                className="text-center">&nbsp;&nbsp;&nbsp; offers the
                                            most extensive set of features, providing top-tier security, privacy, and support
                                            services. It includes all the features of the Plus package, with additional benefits
                                            like a
                                            premium password manager and identity protection tools. The package offers
                                            unique features such as stalkerware detection, notifying users about potentially
                                            harmful apps on their devices. Premium users also benefit from advanced parental
                                            controls, ensuring children online safety, and smart home device monitoring to
                                            guard against intrusions. Additionally, premium services include remote IT
                                            support, expert installation, priority support, and PC health checks, ensuring
                                            comprehensive assistance and optimal device performance. Kaspersky Premium is
                                            designed for users who require the highest level of security, privacy, and
                                            personalized support.</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
