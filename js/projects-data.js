/**
 * PROJECTS DATA
 * -----------------------------------------------------------------------
 * This is the only file you need to touch to add, edit or remove work
 * samples from the "Work" section. The page reads this array and builds
 * the filter chips, the gallery grid and the detail view automatically.
 *
 * TO ADD A NEW PROJECT
 *   1. Drop your image into assets/images/  (JPG or PNG, landscape works best)
 *   2. Copy one of the objects below, give it a new unique "id"
 *   3. Update the fields and save — no other file needs to change
 *
 * Fields:
 *   id          Unique short slug, no spaces (e.g. "site-safety-2024")
 *   title       Project name shown on the card and detail view
 *   category    One tag used for filtering. Keep it short and reuse
 *               existing categories where it makes sense so the filter
 *               chips don't multiply endlessly.
 *   summary     One line shown on the card (roughly 90 characters)
 *   description Longer write-up shown in the detail view. Plain text,
 *               use \n\n for a paragraph break.
 *   tools       Array of software/standards used — shown as small tags
 *   image       Path to the image, relative to index.html
 * -----------------------------------------------------------------------
 */
const PROJECTS = [
  {
    id: "boq-infrastructure-education",
    title: "Bills of Quantities — Infrastructure & Education Works",
    category: "Estimation",
    summary: "Structural BOQ for a tower reconstruction and a province-wide school building programme.",
    description:
      "Two bills of quantities prepared for very different clients: a structural BOQ for the reconstruction of an old Planning & Development building, broken down floor by floor against MRS non-schedule items, and a general-works BOQ for the Sindh Basic Education Program covering temporary facilities, site clearing and dismantling across multiple school sites.\n\nBoth were built item by item with the quantity, unit and rate reference kept traceable back to the drawings and specification, so the numbers hold up under review.",
    tools: ["MRS", "Excel", "Bill of Quantities"],
    image: "assets/images/boq-exhibit.jpg"
  },
  {
    id: "usaid-lumpsum-breakdown",
    title: "Lump Sum Price Breakdown — USAID Sindh Basic Education Program",
    category: "Estimation",
    summary: "Concrete works division priced out under a USAID-funded school construction programme.",
    description:
      "A lump-sum price breakdown for the concrete works division (CSI 03300 — Cast-in-Place Concrete) on a USAID-funded programme building schools across Taluka Shahdadkot and Qubo Saeed Khan, Sindh.\n\nEach item — blinding under mat foundations, isolated footings, grade beams and so on — was quantified and priced per the exhibit format the client required, referencing the project specifications and drawings throughout.",
    tools: ["CSI Divisions", "Excel", "Rate Buildup"],
    image: "assets/images/usaid-combined.jpg"
  },
  {
    id: "planswift-takeoff-residential",
    title: "Material Takeoff in Planswift",
    category: "Takeoff",
    summary: "Wood-framing and finish takeoff for a residential plan, plus basement excavation volumes.",
    description:
      "Custom Planswift templates used to take off exterior and interior wood-stud walls, floor framing, headers and TJI joists directly from a residential upper-level plan, with linear totals and point counts generated automatically.\n\nOn a separate job, the same workflow measured basement excavation area and septic tank excavation volume from a site plan, cross-checked against the stated site dimensions before being exported to Excel for costing.",
    tools: ["Planswift", "Excel", "Concrete Takeoff"],
    image: "assets/images/planswift-combined.jpg"
  },
  {
    id: "bar-bending-schedule",
    title: "Bar Bending Schedule",
    category: "Structural",
    summary: "Column foundation reinforcement scheduled with cutting lengths and total steel weight.",
    description:
      "A full bar bending schedule for a column foundation, covering main bottom bars, main top bars and distribution bars: spacing, number per member, cutting length and bend shape all worked out per bar diameter.\n\nThe sheet totals weight per running foot by bar size and rolls up to a total tonnage figure the site and procurement teams can order against directly.",
    tools: ["Excel", "BBS", "Rebar Estimation"],
    image: "assets/images/bar-bending-schedule.jpg"
  },
  {
    id: "rate-analysis",
    title: "Rate Analysis for Non-Scheduled Items",
    category: "Estimation",
    summary: "Excavation and masonry rates built up from labour, material and machinery first principles.",
    description:
      "Rate analysis for two non-scheduled items: bulk excavation in ordinary soil (labour-only build-up across digging, refilling and dressing crews) and cement-sand masonry work (material quantities per 100 units plus a separate mortar rate).\n\nEvery build-up carries sundries and contractor's profit & overheads as explicit line items, and the underlying market rates are cross-confirmed with stakeholder consultants or the finance department before they're signed off.",
    tools: ["Rate Analysis", "Excel", "Market Rate System"],
    image: "assets/images/rate-analysis.jpg"
  },
  {
    id: "autocad-drafting",
    title: "2D Drafting in AutoCAD",
    category: "Drafting",
    summary: "Ground and first floor residential plans drafted and dimensioned from scratch.",
    description:
      "Ground floor and first floor residential layouts drafted in AutoCAD, including room dimensions, staircases, door and window schedules and overall building setout — used as the base drawing set for the material takeoffs that followed.",
    tools: ["AutoCAD", "Drafting"],
    image: "assets/images/autocad-drafting.jpg"
  },
  {
    id: "safety-dashboard",
    title: "Site Safety & Cost Dashboard",
    category: "Reporting",
    summary: "Monthly accident trends and cost exposure tracked across sites and contractors.",
    description:
      "A reporting dashboard built to give management a fast read on site safety performance: total incidents, injuries and material damage by month, cost breakdown across productivity, replacement, damage, insurance and investigation, plus the riskiest sites and contractors by incident count.\n\nDesigned so a site team can update the underlying figures and the summary view stays current without rebuilding the report each month.",
    tools: ["Excel", "Reporting", "Health & Safety"],
    image: "assets/images/safety-dashboard.jpg"
  }
];
