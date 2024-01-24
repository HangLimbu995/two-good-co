function locomotiveAnimation() {
    gsap.registerPlugin(ScrollTrigger)

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector('#main'),
        smooth: true
    })

    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update)

    // tell ScrollTrigger to use these proxy methods for the "#main" element since LocomotiveScroll is hijacking things.
    ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
            return arguments.length
                ? locoScroll.scrollTo(value, 0, 0)
                : locoScroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return {
                top: 0,
                left: 0,
                width: window.innerWidth,
                height: window.innerHeight,
            };
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile WE sense it by checking to see it there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector("#main").style.transform
            ? "transform"
            : "fixed"
    });
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    ScrollTrigger.refresh();

}

function navbarAnimatioin() {
    gsap.to("#nav-part1 svg", {
        transform: "translateY(-100%)",
        scrollTrigger: {
            trigger: "#page1",
            scroller: "#main",
            start: "top 0",
            end: "top -5%",
            scrub: true,
        }
    });
    gsap.to("#nav-part2 #links", {
        transform: "translateY(-100%)",
        opacity: 0,
        scrollTrigger: {
            trigger: "#page1",
            scroller: "#main",
            start: "top 0",
            end: "top -5%",
            scrub: true,
        }
    })
}

function videoconAnimation() {
    var videocon = document.querySelector("#video-container")
    var playbtn = document.querySelector("#play")
    videocon.addEventListener("mouseenter", () => {
        gsap.to(playbtn, {
            scale: 1,
            opacity: 1,
        })
    })
    videocon.addEventListener("mouseleave", () => {
        gsap.to(playbtn, {
            scale: 0,
            opacity: 0,
        })
    })
    videocon.addEventListener("mousemove", (dets) => {
        gsap.to(playbtn, {
            left: dets.x - 50,
            top: dets.y - 50,
        })
    })
}

function loadinganimation() {
    gsap.from("#page1 h1", {
        y: 100,
        opacity: 0,
        delay: 0.5,
        duration: 0.9,
        stagger: 0.3,
    })
    gsap.from("#page1 #video-container", {
        scale: 0.9,
        opacity: 0,
        delay: 1.3,
        duration: 0.5,
    })
}

function cursorAnimation() {
    document.addEventListener("mousemove", (dets) => {
        gsap.to("#cursor", {
            left: dets.x,
            top: dets.y,
        })
    })

    document.querySelector(".child").forEach((elem) => {
        elem.addEventListener("mouseenter", () => {
            gsap.to("#cursor", {
                transform: "translate(-50%, -50%) scale(1)",
            })
        })
        elem.addEventListener("mouseleave", () => {
            gsap.to("#cursor", {
                transform: "translate(-50%, -50%) scale(0)"
            })
        })
    })
}

document.addEventListener("DOMContentLoaded", () => {
    locomotiveAnimation();
    navbarAnimatioin();
    videoconAnimation();
    loadinganimation();
    cursorAnimation();
})