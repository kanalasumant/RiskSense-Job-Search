export default {
  availability: [
    {
      label: "Hourly",
      boolValue: "hourly"
    },
    {
      label: "Part-Time (20 hrs/wk)",
      boolValue: "partTime"
    },
    {
      label: "Full-Time (40 hrs/wk)",
      boolValue: "fullTime"
    }
  ],
  experienceLevels: [JOB_LEVEL_UNSPECIFIED, ENTRY_LEVEL, EXPERIENCED],
  payRate: {
    defaultMinPayValue: 20,
    defaultMaxPayValue: 60,
    minPayValue: 1,
    maxPayValue: 200,
    marks: {
      1: 1,
      200: 200
    }
  },
  jobType: [
    "JOB_CATEGORY_UNSPECIFIED",
    "ACCOUNTING_AND_FINANCE",
    "ADMINISTRATIVE_AND_OFFICE",
    "ADVERTISING_AND_MARKETING",
    "ANIMAL_CARE",
    "ART_FASHION_AND_DESIGN",
    "BUSINESS_OPERATIONS",
    "CLEANING_AND_FACILITIES",
    "COMPUTER_AND_IT",
    "CONSTRUCTION",
    "CUSTOMER_SERVICE",
    "EDUCATION",
    "ENTERTAINMENT_AND_TRAVEL",
    "FARMING_AND_OUTDOORS",
    "HEALTHCARE",
    "HUMAN_RESOURCES",
    "INSTALLATION_MAINTENANCE_AND_REPAIR",
    "LEGAL",
    "MANAGEMENT",
    "MANUFACTURING_AND_WAREHOUSE",
    "MEDIA_COMMUNICATIONS_AND_WRITING",
    "OIL_GAS_AND_MINING",
    "PERSONAL_CARE_AND_SERVICES",
    "PROTECTIVE_SERVICES",
    "REAL_ESTATE",
    "RESTAURANT_AND_HOSPITALITY",
    "SALES_AND_RETAIL",
    "SCIENCE_AND_ENGINEERING",
    "SOCIAL_SERVICES_AND_NON_PROFIT",
    "SPORTS_FITNESS_AND_RECREATION",
    "TRANSPORTATION_AND_LOGISTICS"
  ]
};
