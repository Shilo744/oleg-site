import { markets } from "./markets.js";

// The four HVAC prompts of the sample brief. The sample page and the drawing both use them.
const hvacPoints = [
  ["Heating plant", "Investigate the proposed heat source, plant replacement and distribution requirements."],
  ["Hot water", "Clarify demand, storage and any changes to guest-room provision."],
  ["Ventilation", "Establish whether kitchens, bathrooms and shared areas require upgrades."],
  ["Controls and commissioning", "Check integration requirements and responsibility for testing and handover."],
];

// Small labels used inside the drawings. The drawings are decoration. The text next to them says the same.
const visuals = {
  signals: { match: "Match", filtered: "Filtered out" },
  brief: { facts: "Facts", interpretation: "Interpretation", open: "Open questions" },
  path: { contractor: "Contractor", package: "Package", next: "Next action", drop: "Not worth it" },
  weeks: { week: "Week", deep: "One deeper project investigation" },
};

export const createContent = (market) => {
  const A = market.adjective;
  const city = market.sampleCity;
  const value = market.projectValue;
  const word = market.projectWord;

  const diagram = {
    eyebrow: "Illustrative scenario",
    title: ["Four places to look", `in a hotel ${word}.`],
    intro: "A fictional hotel, drawn as a section. These are the areas where heating and mechanical scope may sit. They are prompts to investigate, not confirmed specifications.",
    caption: "Fictional hotel. Not a real building or project.",
    items: hvacPoints,
  };

  return {
    visuals,
    diagram,
    navigation: {
      howItWorks: "How it works",
      sample: "Sample brief",
      pilot: "The pilot",
      about: "About",
      contact: "Contact",
      menu: "Menu",
      countryLabel: "Choose country",
    },
    footer: {
      descriptor: `Project intelligence for ${A} commercial HVAC contractors`,
      sample: "Sample brief",
      about: "About Atlas",
      contact: "Contact",
      statement: "Independent. Founder-led. Clear about what is known.",
    },
    home: {
      visuals,
      diagram,
      hero: {
        eyebrow: `${A} commercial HVAC project intelligence`,
        title: [`Find ${A} commercial HVAC`, "projects worth pursuing."],
        body: `Atlas reviews public information about ${A} commercial developments and checks each project against your services, location, capacity and typical project size. You receive a concise brief with the facts, open questions and a practical next step.`,
        primary: "View the sample brief",
        secondary: "Explore the founding pilot",
        microcopy: "Public sources. Human review. Clear next steps.",
        mapPreview: {
          label: "Illustrative opportunity",
          sector: "Sector",
          value: "Assumed total project value",
          valueNone: "Not stated",
          scope: "Potential scope",
          checks: "What to check first",
          note: "Prompts to investigate. Not specifications.",
          chip: "Illustrative only",
          link: "Read the sample brief",
        },
        trust: [
          `Focused on ${A} commercial projects`,
          "Reviewed before each delivery",
          "Facts, unknowns and next actions",
        ],
      },
      deliverables: {
        eyebrow: "What you receive",
        title: ["Enough context", "to make a decision."],
        intro: "Atlas does not send a long list of names. It delivers a small number of researched project signals so you can decide which opportunities deserve more time.",
        items: [
          {
            number: "01",
            title: "Relevant project signals",
            body: "Potential opportunities are selected against your services, geographic coverage, available capacity and normal project size. A match means the project merits investigation. It does not mean that work is available.",
          },
          {
            number: "02",
            title: "A concise evidence brief",
            body: "The brief brings together available project facts, timing, organisations, possible HVAC relevance and procurement signals. Source-backed findings are kept separate from interpretation and open questions.",
          },
          {
            number: "03",
            title: "A practical next step",
            body: "Each delivery explains what to check next. This can include confirming the contractor, testing whether a package is still being procured or deciding that the project is not worth further effort.",
          },
        ],
      },
      process: {
        eyebrow: "How it works",
        title: ["From public signal", "to a clearer decision."],
        intro: "Research starts with public project information. This can include planning information, project announcements and reported developments. Atlas reviews what is available before a brief is delivered.",
        steps: [
          {
            number: "01",
            title: "Define the fit",
            body: "You explain your services, coverage, capacity and normal project size. These points guide the research and help remove projects that do not fit your business.",
          },
          {
            number: "02",
            title: "Find public signals",
            body: "Atlas monitors public information for commercial projects that may involve heating, ventilation, cooling or related mechanical work.",
          },
          {
            number: "03",
            title: "Research and review",
            body: "The project, timing and organisations are checked. Potential HVAC relevance is assessed, while missing evidence and procurement questions stay clearly marked.",
          },
          {
            number: "04",
            title: "Deliver with direction",
            body: "You receive a brief reviewed before delivery. It shows what is known, what remains uncertain and the next action that could test the opportunity.",
          },
        ],
        note: "Atlas is a research service. A brief is not a tender notice, a promise of available work or a guarantee of winning a contract.",
      },
      sample: {
        eyebrow: "See the product",
        title: ["A project signal.", "A structured investigation."],
        paragraphs: [
          "The sample shows how Atlas organises potential scope, procurement questions, evidence status and the next research action.",
          `It uses a fictional ${city} hotel scenario. It demonstrates the format only and is not a live opportunity.`,
        ],
        link: "Read the full sample brief",
      },
      card: {
        label: "Atlas / opportunity brief",
        status: "Illustrative sample",
        sectorLabel: "Sector",
        sector: "Hospitality",
        scopeLabel: "Potential scope",
        scope: "Heating and mechanical",
        points: [
          "Possible heating replacement",
          "Organisations and procurement to verify",
          "Facts separated from open questions",
          "A defined next research action",
        ],
        disclaimer: "Fictional demonstration. Not a verified live opportunity.",
      },
      pilot: {
        eyebrow: "A focused way to test Atlas",
        title: ["Four weeks.", "Twelve researched signals."],
        body: "The founding pilot applies the service to your business for four weeks. Research is guided by your services, coverage, capacity and normal project size. At the end, you decide whether the briefs saved time and supported better commercial decisions.",
        features: [
          "Three researched opportunities each week",
          "Every brief reviewed before delivery",
          "One deeper project investigation during the pilot",
          "Research guided by your business profile",
          "No long-term commitment",
        ],
        cta: "Discuss the pilot",
      },
      founder: {
        eyebrow: "The person behind the research",
        title: ["Founder-led.", "Direct and accountable."],
        paragraphs: [
          `Atlas is built by a software engineer with professional experience in business intelligence and information-monitoring workflows. That experience is now applied to research for ${A} commercial HVAC contractors.`,
          "During the pilot, you work directly with the person reviewing the information. You can explain what makes a project useful, question the reasoning and refine the research focus.",
        ],
        link: "Read about the approach",
      },
      finalCta: {
        title: ["See the brief before", "you discuss the pilot."],
        primary: "Read the sample",
        secondary: "Discuss the pilot",
      },
    },
    about: {
      eyebrow: "About Atlas",
      title: ["Careful research.", "A direct relationship."],
      lead: `Atlas is a founder-led research service for ${A} commercial HVAC contractors. It helps businesses assess public project signals before they invest time in outreach or estimating.`,
      sections: [
        {
          title: "The experience behind the work",
          paragraphs: [
            "Atlas is built by a software engineer with professional experience in business intelligence and information-monitoring workflows. The service applies that research discipline to commercial project information.",
            "The aim is practical: bring scattered information together, make uncertainty visible and help a contractor choose the next sensible action.",
          ],
        },
        {
          title: "What Atlas researches",
          paragraphs: [
            "Research starts with public signals such as planning information, project announcements and reported developments. A signal is only a starting point. Its value depends on timing, possible scope, the organisations involved and whether there is a realistic route to a commercial conversation.",
            "A brief separates source-backed findings from interpretation. Missing information remains an open question. Atlas does not present an unverified project as an open tender.",
          ],
        },
        {
          title: "Research shaped around your business",
          paragraphs: [
            "At the start of the pilot, you explain your services, geographic coverage, available capacity and normal project size. These points guide selection. They do not guarantee that every project will become available work.",
            "You work directly with the person doing the research. Feedback during the pilot helps refine what a useful opportunity looks like for your business.",
          ],
        },
        {
          title: "Clear limits",
          paragraphs: [
            "Atlas provides research and direction. It does not guarantee procurement access, introductions, invitations to tender or contract awards. The client still decides which projects to pursue and verifies commercial requirements with the relevant organisation.",
          ],
        },
      ],
      aside: {
        eyebrow: "The approach",
        title: "Focused and transparent.",
        points: [
          "Public project signals",
          "Review before delivery",
          "Facts separated from interpretation",
          "Open questions kept visible",
          "A practical next action",
        ],
        link: "Read the sample brief",
      },
    },
    contact: {
      eyebrow: "Discuss the founding pilot",
      title: ["Start with", "your business."],
      lead: "Useful project research depends on what you install, where you work and which projects fit your team. A first conversation establishes that research profile.",
      heading: "What to include",
      body: "Describe your main services, geographic coverage, available capacity and normal project size. You can also name sectors or project types that you want to include or avoid. Atlas uses this information to focus the four-week pilot.",
      nextHeading: "What happens next",
      nextBody: "The first step is a direct discussion about fit and expectations. No project is presented as guaranteed work. If the pilot is suitable, the research focus is agreed before the first weekly delivery.",
      pendingTitle: "Contact details are being finalised.",
      pendingBody: "This is a local preview. The business email will be added before launch, so pilot enquiries are not being collected here yet.",
      profile: ["Services", "Coverage", "Capacity", "Project size"],
      sampleLink: "Read the sample brief first",
      pilotEyebrow: "Founding contractor pilot",
      features: [
        "Three researched opportunities each week",
        "Every brief reviewed before delivery",
        "One deeper project investigation during the pilot",
        "Research guided by your business profile",
        "No long-term commitment",
      ],
    },
    sample: {
      eyebrow: "Atlas opportunity brief / illustrative sample",
      title: `Illustrative ${value} hotel ${word}`,
      lead: [
        market.sampleLocation,
        "A fictional example that shows how Atlas separates evidence, interpretation, open questions and the next action.",
      ],
      noticeTitle: "Illustrative sample — not a live lead.",
      noticeBody: "The project, budget, organisations and scope below are fictional. No tender, contractor appointment or available HVAC package has been verified. A real Atlas brief would include dated source links for its project claims.",
      sections: [
        {
          title: "01 / Signal and evidence status",
          paragraphs: [
            `Assume that public information points to the ${word} of an existing ${city} hotel. The fictional scenario includes guest rooms, shared areas and replacement of an ageing heating system.`,
            `The ${value} figure is an assumed total project value. It is not an HVAC package value. In a real brief, Atlas would link each source-backed finding, record its publication date and state when the brief was reviewed.`,
          ],
        },
        {
          title: "02 / Potential HVAC relevance",
          bullets: hvacPoints,
          paragraphs: [
            "These points are commercial interpretation based on the fictional scenario. They are not confirmed specifications and do not show that a subcontract package is available.",
          ],
        },
        {
          title: "03 / Organisations and procurement",
          details: [
            ["Client or developer", "Not named in this fictional scenario"],
            ["Main contractor", "Appointment and identity to be verified"],
            ["Mechanical designer or consultant", "To be established from project information"],
            ["Procurement route", "Unknown — direct appointment or subcontract route to investigate"],
            ["Package status", "No evidence of an open HVAC package"],
          ],
        },
        {
          title: "04 / Fit and open questions",
          paragraphs: [
            `This scenario may merit review by a commercial HVAC contractor with hospitality refurbishment experience and suitable capacity in ${city}. Before spending estimating time, confirm the programme, actual mechanical scope, package status and who controls the shortlist.`,
            "Any trading, insurance, accreditation or delivery requirements must be checked with the procuring organisation.",
          ],
        },
        {
          title: "05 / Recommended next action",
          paragraphs: [
            "Start with procurement verification. Identify the appointed main contractor through reliable project information. Then ask its procurement team whether mechanical services are still being procured and how a suitable contractor can register interest.",
            "If the package remains available and fits your business, request scope and programme information before preparing a proposal. If it is already placed, record that result and redirect your effort.",
          ],
        },
        {
          title: "What a real Atlas brief adds",
          paragraphs: [
            "A live research brief would include dated source links, a review date and clear labels for confirmed facts, commercial interpretation and unresolved questions. It would still not guarantee that work is available or that the recipient will enter a procurement process.",
          ],
        },
      ],
      aside: {
        eyebrow: "At a glance",
        title: "Potential commercial HVAC fit",
        body: "A fictional hospitality refurbishment with possible heating and mechanical work.",
        details: [
          ["Location", city],
          ["Sector", "Hospitality"],
          ["Assumed total project value", value],
          ["Research priority", "Confirm procurement status"],
          ["Evidence status", "Illustrative only"],
        ],
        followup: "Want research focused on your business?",
        cta: "Discuss the pilot",
      },
    },
  };
};

export const czechContent = createContent(markets.cz);
export const ukContent = createContent(markets.uk);
export const deContent = createContent(markets.de);
