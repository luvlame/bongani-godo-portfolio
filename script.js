/* ========================================
   BONGANI GODO PORTFOLIO
======================================== */


/* ========================================
   PAGE TRANSITIONS
   Full-screen curtain wipe between pages,
   with a glowing green scan-line at the
   leading edge. Runs immediately (not
   inside DOMContentLoaded) so the reveal
   starts the instant the page paints.
======================================== */

(() => {

    const overlay =
        document.getElementById(
            "page-transition-overlay"
        );


    if (!overlay) return;


    /* --------------------------------
       REVEAL CURRENT PAGE ON LOAD
    -------------------------------- */

    requestAnimationFrame(
        () => {

            requestAnimationFrame(
                () => {

                    overlay.classList.add(
                        "pt-reveal"
                    );

                }
            );

        }
    );


    /* --------------------------------
       RESTORE IF PAGE IS RESTORED
       FROM BACK/FORWARD CACHE
    -------------------------------- */

    window.addEventListener(
        "pageshow",
        event => {

            if (event.persisted) {

                overlay.classList.remove(
                    "pt-cover"
                );

                overlay.classList.add(
                    "pt-reveal"
                );

            }

        }
    );


    /* --------------------------------
       INTERCEPT INTERNAL PAGE LINKS
    -------------------------------- */

    document.addEventListener(
        "click",
        event => {

            const link =
                event.target.closest(
                    "a[href]"
                );


            if (!link) return;


            const href =
                link.getAttribute(
                    "href"
                );


            const isInternalPage =
                href &&
                href.endsWith(".html") &&
                link.target !== "_blank" &&
                !href.startsWith("http") &&
                !href.startsWith("//");


            if (!isInternalPage) return;


            if (
                event.metaKey ||
                event.ctrlKey ||
                event.shiftKey ||
                event.altKey ||
                event.button !== 0
            ) return;


            event.preventDefault();


            overlay.classList.remove(
                "pt-reveal"
            );

            overlay.classList.add(
                "pt-cover"
            );


            window.setTimeout(
                () => {

                    window.location.href =
                        href;

                },
                520
            );

        }
    );

})();


document.addEventListener(
    "DOMContentLoaded",
    () => {


        /* ========================================
           MOBILE MENU
        ======================================== */

        const menuButton =
            document.querySelector(
                ".menu-toggle"
            );


        const navigation =
            document.querySelector(
                ".site-nav"
            );


        if (
            menuButton &&
            navigation
        ) {

            menuButton.addEventListener(
                "click",
                () => {

                    const isOpen =
                        navigation.classList.toggle(
                            "open"
                        );


                    menuButton.setAttribute(
                        "aria-expanded",
                        isOpen
                            ? "true"
                            : "false"
                    );

                }
            );


            navigation
                .querySelectorAll("a")
                .forEach(
                    link => {

                        link.addEventListener(
                            "click",
                            () => {

                                navigation.classList.remove(
                                    "open"
                                );

                                menuButton.setAttribute(
                                    "aria-expanded",
                                    "false"
                                );

                            }
                        );

                    }
                );

        }



        /* ========================================
           3D NAVIGATION
        ======================================== */

        const cards =
            document.querySelectorAll(
                ".nav-card"
            );


        cards.forEach(
            card => {

                const link =
                    card.querySelector(
                        "a"
                    );


                if (!link) return;


                /* --------------------------------
                   MOUSE MOVE
                -------------------------------- */

                card.addEventListener(
                    "mousemove",
                    event => {

                        const rect =
                            card.getBoundingClientRect();


                        const mouseX =
                            event.clientX -
                            rect.left;


                        const mouseY =
                            event.clientY -
                            rect.top;


                        const centerX =
                            rect.width / 2;


                        const centerY =
                            rect.height / 2;


                        /*
                         * Rotation strength
                         */

                        const rotateY =
                            (
                                mouseX -
                                centerX
                            )
                            /
                            centerX
                            *
                            12;


                        const rotateX =
                            (
                                centerY -
                                mouseY
                            )
                            /
                            centerY
                            *
                            12;


                        link.style.transform = `
                            perspective(900px)
                            rotateX(${rotateX}deg)
                            rotateY(${rotateY}deg)
                            translateZ(12px)
                            scale(1.04)
                        `;

                    }
                );


                /* --------------------------------
                   MOUSE LEAVE
                -------------------------------- */

                card.addEventListener(
                    "mouseleave",
                    () => {

                        link.style.transform = `
                            perspective(900px)
                            rotateX(0deg)
                            rotateY(0deg)
                            translateZ(0)
                            scale(1)
                        `;

                    }
                );


                /* --------------------------------
                   TOUCH DEVICES
                -------------------------------- */

                card.addEventListener(
                    "touchstart",
                    () => {

                        link.style.transform = `
                            perspective(900px)
                            rotateX(2deg)
                            rotateY(-2deg)
                            translateZ(8px)
                            scale(1.02)
                        `;

                    },
                    {
                        passive: true
                    }
                );


                card.addEventListener(
                    "touchend",
                    () => {

                        link.style.transform = `
                            perspective(900px)
                            rotateX(0deg)
                            rotateY(0deg)
                            translateZ(0)
                            scale(1)
                        `;

                    },
                    {
                        passive: true
                    }
                );

            }
        );



        /* ========================================
           PROJECT CARDS — 3D TILT + SHINE
           (mouse-tracked tilt + glow, same technique
           as the nav-card 3D effect above, applied to
           .project-card on the Projects page)
        ======================================== */

        const projectCards =
            document.querySelectorAll(
                ".project-card"
            );


        projectCards.forEach(
            card => {

                card.addEventListener(
                    "mousemove",
                    event => {

                        const rect =
                            card.getBoundingClientRect();


                        const mouseX =
                            event.clientX -
                            rect.left;


                        const mouseY =
                            event.clientY -
                            rect.top;


                        const centerX =
                            rect.width / 2;


                        const centerY =
                            rect.height / 2;


                        const rotateY =
                            (
                                mouseX -
                                centerX
                            )
                            /
                            centerX
                            *
                            6;


                        const rotateX =
                            (
                                centerY -
                                mouseY
                            )
                            /
                            centerY
                            *
                            6;


                        card.style.transform = `
                            perspective(1200px)
                            rotateX(${rotateX}deg)
                            rotateY(${rotateY}deg)
                            translateY(-6px)
                            scale(1.015)
                        `;


                        /*
                         * Track cursor position for the
                         * radial shine in ::after.
                         */

                        card.style.setProperty(
                            "--mx",
                            `${mouseX}px`
                        );


                        card.style.setProperty(
                            "--my",
                            `${mouseY}px`
                        );

                    }
                );


                card.addEventListener(
                    "mouseleave",
                    () => {

                        card.style.transform = `
                            perspective(1200px)
                            rotateX(0deg)
                            rotateY(0deg)
                            translateY(0)
                            scale(1)
                        `;

                    }
                );

            }
        );



        /* ========================================
           BACKGROUND VIDEO
        ======================================== */

        const video =
            document.querySelector(
                "#background-video"
            );


        if (video) {

            video.muted = true;


            const playVideo =
                () => {

                    const promise =
                        video.play();


                    if (
                        promise !== undefined
                    ) {

                        promise.catch(
                            () => {
                                /*
                                 * Browser prevented
                                 * autoplay.
                                 */
                            }
                        );

                    }

                };


            playVideo();

        }



        /* ========================================
           ACTIVE PAGE
        ======================================== */

        const currentPage =
            window.location.pathname
                .split("/")
                .pop()
                .toLowerCase();


        cards.forEach(
            card => {

                const link =
                    card.querySelector(
                        "a"
                    );


                if (!link) return;


                const linkPage =
                    link
                        .getAttribute("href")
                        .toLowerCase();


                if (
                    linkPage ===
                    currentPage
                ) {

                    card.classList.add(
                        "active"
                    );

                }

            }
        );

    }
);