document.addEventListener("alpine:init", () => {
    /* x-reveal: fade elements in the first time they scroll into view */
    const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
            if (e.isIntersecting) {
                e.target.classList.add("in");
                io.unobserve(e.target);
            }
        });
    }, { threshold: .05, rootMargin: "0px 0px -40px 0px" });

    Alpine.directive("reveal", (el, _, { cleanup }) => {
        el.classList.add("rv");
        io.observe(el);
        cleanup(() => io.unobserve(el));
    });

    Alpine.data("portfolio", () => ({
        projects: window.PROJECTS,
        cats: [
            ["all", "All"], ["gov", "Government"], ["quran", "Quran & hadith"],
            ["edu", "Education"], ["consumer", "Consumer"], ["health", "Healthcare"]
        ],
        cur: "all",
        theme: document.documentElement.dataset.theme || "dark",

        get shown() {
            return this.projects.filter((p) => this.cur === "all" || p.c === this.cur);
        },
        get featured() {
            return this.shown.filter((p) => p.f);
        },
        get rest() {
            return this.shown.filter((p) => !p.f);
        },

        label(c) {
            return (this.cats.find((x) => x[0] === c) || [, ""])[1];
        },
        name(p) {
            return p.t + (p.ar ? ' <span class="ar">' + p.ar + "</span>" : "");
        },
        toggleTheme() {
            this.theme = this.theme === "dark" ? "light" : "dark";
            document.documentElement.dataset.theme = this.theme;
        }
    }));
});
