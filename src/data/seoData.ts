// SEO Service, Brand, City, and Blog Data for Rick Nees Appliance Repair

export interface ServiceData {
  id: string;
  name: string;
  keyword: string;
  shortDesc: string;
  fullDesc: string;
  symptoms: string[];
  tips: string[];
  faqs: { q: string; a: string }[];
}

export interface CityData {
  id: string;
  name: string;
  zips: string[];
  landmarks: string[];
  neighborhoods: string[];
  intro: string;
  highlights: string[];
  faq: { q: string; a: string }[];
}

export interface BrandData {
  name: string;
  description: string;
  tip: string;
}

export interface BlogPostData {
  id: string;
  title: string;
  slug: string;
  date: string;
  readTime: string;
  category: string;
  summary: string;
  content: string;
}

export const servicesData: ServiceData[] = [
  {
    id: 'washer-repair',
    name: 'Washer Repair',
    keyword: 'washer repair Wichita',
    shortDesc: 'Expert repair for front-load, top-load, and stackable washing machines.',
    fullDesc: 'Is your washing machine leaving clothes soaking wet, leaking on your floor, or making deafening noises during the spin cycle? A broken washer halts your household routine instantly. For over 40 years, Rick Nees Appliance Repair has served Wichita homeowners with reliable, same-day washing machine diagnostics and repairs. We troubleshoot all major brands and styles, replacing failing drain pumps, worn tub bearings, broken lid switches, and faulty control boards using high-grade OEM parts.',
    symptoms: [
      'Washer not draining (standing water in drum)',
      'Loud banging or vibration during spin cycle',
      'Leaking water from the door seal or bottom panel',
      'Will not spin or complete cycles',
      'Error codes on electronic display'
    ],
    tips: [
      'Avoid overloading the washing machine; it puts excessive wear on the drum bearings and suspension.',
      'Check pockets for coins, pins, or keys before washing. These commonly clog the drain pump impeller.',
      'Leave the washer door slightly open after front-load cycles to allow moisture to evaporate and prevent mold.'
    ],
    faqs: [
      { q: 'Why is my washer not draining?', a: 'The most common causes for a washer not draining are a clogged drain pump filter (often full of coins or lint), a failed drain pump motor, or a kinked/blocked drain hose. We can resolve this quickly by clearing the lines or replacing the pump motor.' },
      { q: 'Is it worth repairing a washing machine that is 8 years old?', a: 'Generally, if the repair cost is less than 50% of the price of a comparable new washer and the machine is otherwise in good shape, a repair is highly cost-effective and can extend its life by several years.' }
    ]
  },
  {
    id: 'dryer-repair',
    name: 'Dryer Repair',
    keyword: 'dryer repair Wichita',
    shortDesc: 'Same-day diagnostics for gas and electric dryers that won’t heat or tumble.',
    fullDesc: 'A dryer that takes three cycles to dry a load of laundry is not just frustrating; it is a major energy drain and a serious fire hazard. Whether you have a gas dryer or electric dryer, our technicians have decades of experience diagnosing heating element failures, thermal fuse blowouts, broken drive belts, and worn rollers. We get your laundry room back in action with same-day service and reliable warranties on all repair parts.',
    symptoms: [
      'Dryer runs but produces no heat',
      'Dryer tumbles but clothes take too long to dry',
      'Squealing, grinding, or thumping sounds',
      'Dryer will not turn on or start tumbling',
      'Burning smell during operation'
    ],
    tips: [
      'Clean the lint filter after every single load to ensure adequate airflow and prevent fire hazards.',
      'Have your dryer exhaust duct professionally cleaned at least once a year to prevent lint build-up and reduce drying times.',
      'Do not overload your dryer; clothes need room to tumble and breathe to dry efficiently.'
    ],
    faqs: [
      { q: 'Why is my dryer tumbling but not heating?', a: 'For electric dryers, this is usually due to a burned-out heating element, a tripped thermal fuse, or a bad thermostat. For gas dryers, it is often caused by failed gas valve solenoids. Our techs carry these common parts on their trucks for immediate repairs.' },
      { q: 'Is a dryer squeaking noise dangerous?', a: 'A squeaking noise typically indicates worn drum support rollers, a failing belt tensioner pulley, or dry drum bearings. If ignored, these parts can seize and cause damage to the drive motor or drum.' }
    ]
  },
  {
    id: 'refrigerator-repair',
    name: 'Refrigerator Repair',
    keyword: 'refrigerator repair Wichita',
    shortDesc: 'Protect your food with immediate same-day refrigerator compressor and control repairs.',
    fullDesc: 'A warm refrigerator is a race against time before hundreds of dollars in groceries go bad. Our expert technicians understand the urgency of refrigerator repairs in Wichita. We diagnose french door refrigerators, side-by-side models, and built-in units (like Sub-Zero). We are highly trained in resolving compressor failures, evaporator fan issues, defrost cycle failures, and faulty main control boards, ensuring your temperature stays right where it belongs.',
    symptoms: [
      'Fresh food section is warm while freezer is cold',
      'Clicking sounds from the back bottom panel',
      'Leaking water or ice build-up in the freezer floor',
      'Constant running or loud humming',
      'Digital display blinking or non-responsive'
    ],
    tips: [
      'Vacuum the condenser coils on the back or bottom of your refrigerator twice a year to keep it running efficiently.',
      'Make sure the refrigerator doors are sealing tightly by checking if a dollar bill can easily slip past the gasket.',
      'Keep the refrigerator at least 75% full to help maintain cool temperatures when doors are opened.'
    ],
    faqs: [
      { q: 'Why is my refrigerator warm but the freezer is cold?', a: 'This is usually caused by an airflow failure, such as a frozen evaporator coil blocking the return duct, a failed evaporator fan motor, or a broken damper door. We can diagnose the exact defrost failure and repair it on the spot.' },
      { q: 'How long should a refrigerator compressor last?', a: 'A quality compressor should last 10 to 15 years. If yours fails early, we can assess whether it is under warranty or if replacing the compressor is the best option for your unit.' }
    ]
  },
  {
    id: 'freezer-repair',
    name: 'Freezer Repair',
    keyword: 'freezer repair Wichita',
    shortDesc: 'Prompt repair for chest, upright, and built-in freezers to prevent food spoilage.',
    fullDesc: 'If your upright freezer or chest freezer is starting to thaw out, you risk losing hundreds of dollars of meat and frozen food. Rick Nees Appliance Repair provides immediate, emergency freezer diagnostics in the Wichita metro area. We service commercial and residential freezers, fixing thermostat issues, defroster failures, faulty gaskets, and compressor lockups to secure your investment and peace of mind.',
    symptoms: [
      'Frost building up rapidly on walls and food packages',
      'Freezer temperature slowly rising above 0°F',
      'Clicking or loud rattling noises',
      'Freezer runs constantly without cycling off',
      'Pooling water underneath the cabinet'
    ],
    tips: [
      'Keep your freezer at 0°F (-18°C) for optimal food safety and appliance operation.',
      'Ensure the freezer door gasket is clean and free of sticky syrups or crumbs, which break the air seal.',
      'Allow hot foods to cool completely before placing them in the freezer to prevent frost build-up.'
    ],
    faqs: [
      { q: 'Why is my freezer accumulating so much frost?', a: 'Frost build-up is caused by warm, moist air entering the cabinet. This happens if the door gasket is torn or warped, if the door is left open, or if the auto-defrost heater has failed.' },
      { q: 'What is the ideal temperature for a home freezer?', a: 'Your freezer should be kept at exactly 0°F (-18°C). Any temperature above 10°F can accelerate food spoilage and trigger compressor wear.' }
    ]
  },
  {
    id: 'dishwasher-repair',
    name: 'Dishwasher Repair',
    keyword: 'dishwasher repair Wichita',
    shortDesc: 'Stop hand-washing! Quick fixes for leaks, poor cleaning, and drainage issues.',
    fullDesc: 'No one wants to go back to hand-washing dishes. If your dishwasher leaves spots, won’t drain, or runs a cycle only to leave dishes dirty, we can help. Our Wichita technicians repair all major dishwasher models (including Bosch, KitchenAid, and GE). We regularly fix broken wash impellers, failed heating elements, clogged spray arms, and bad float switches, ensuring your dishes come out sparkling clean every time.',
    symptoms: [
      'Dishes come out dirty or covered in white film',
      'Water pool at the bottom of the tub at cycle end',
      'Water leaking onto the kitchen floor during fill/wash',
      'Dishwasher won\'t start or lights blink',
      'Soap dispenser door fails to open'
    ],
    tips: [
      'Run a cup of white vinegar through a hot cycle once a month to remove mineral buildup and grease.',
      'Scrape large food chunks off dishes but do not pre-rinse; dishwasher detergents need some grease to activate properly.',
      'Clean the filter mesh at the bottom of your dishwasher regularly to prevent blockages.'
    ],
    faqs: [
      { q: 'Why is my dishwasher not cleaning my dishes properly?', a: 'This is usually due to clogged spray arm holes, a worn-out wash pump motor, a malfunctioning heating element, or mineral build-up inside the tub. We can clear obstructions and restore full water pressure.' },
      { q: 'Why is water sitting in the bottom of my dishwasher?', a: 'Standing water is usually caused by a clogged sink drain line, a blocked garbage disposal connection, a kinked drain hose, or a failed drain pump.' }
    ]
  },
  {
    id: 'oven-repair',
    name: 'Oven Repair',
    keyword: 'oven-repair',
    shortDesc: 'Diagnostic and repair services for baking elements, igniters, and temperature sensors.',
    fullDesc: 'A broken oven can completely disrupt family meals and holiday planning. Whether you have a gas oven that won’t ignite or an electric oven with uneven heating, Rick Nees Appliance Repair has the expertise you need. We replace burned-out bake and broil elements, faulty gas igniters, failing temperature sensors, and malfunctioning control relays to get your kitchen cooking safely and accurately.',
    symptoms: [
      'Bake element doesn\'t glow red or has visible breaks',
      'Gas oven click-click-clicks but never lights',
      'Oven temperature fluctuates or burns food',
      'Door glass is cracked or hinges are misaligned',
      'F-code errors appearing on the electronic display'
    ],
    tips: [
      'Avoid using the self-cleaning oven feature right before major holidays. The high heat can burn out fuses or control boards.',
      'Do not line the bottom of an electric oven with aluminum foil; it blocks air flow and can melt onto the heating element.',
      'Clean up spills early to prevent them from smoking or burning out bake elements.'
    ],
    faqs: [
      { q: 'Why is my gas oven not heating up?', a: 'The most common culprit is a failing glow-bar igniter. Even if it glows, it may not draw enough electric current to safely open the gas valve. Replacing the igniter is a safe, routine repair for our team.' },
      { q: 'Why is my oven baking unevenly?', a: 'This is typically due to a failing temperature sensor, a worn-out bake element, or bad door hinges that let heat escape. We can calibrate your temperature sensor and check heating consistency.' }
    ]
  },
  {
    id: 'stove-repair',
    name: 'Stove Repair',
    keyword: 'stove repair Wichita',
    shortDesc: 'Solve burner ignition and electrical heating issues on gas or glass cooktops.',
    fullDesc: 'Keep your stovetop operational and safe. Our experienced technicians service both gas and electric stovetops in Wichita, KS. From repairing spark modules and gas orifices to replacing glass cooktop surfaces and infinite burner switches, we handle it all with the highest standards of safety and workmanship.',
    symptoms: [
      'Electric burner burner won\'t heat up',
      'Gas burner burner clicks but won\'t ignite',
      'Burner only heats to high temperature regardless of setting',
      'Glass stovetop has a deep scratch or crack',
      'Indicator light stays on constantly'
    ],
    tips: [
      'Clean gas burner caps regularly with warm water to prevent soot blockages.',
      'Use cookware with flat bottoms that match the burner size for even heating.',
      'Avoid sliding cast iron pans across a glass cooktop to prevent cracking.'
    ],
    faqs: [
      { q: 'How do you clean clogged burner ports?', a: 'Use a sewing needle or paperclip to gently clear ports of food particles. Never use wood toothpicks which can snap off inside the burner.' },
      { q: 'Why is my electric burner only working on "High"?', a: 'This is a classic sign of a failed infinite control switch behind the burner knob. It fails to regulate power and defaults to 100% heat. We carry replacements for all major brands.' }
    ]
  },
  {
    id: 'range-repair',
    name: 'Range Repair',
    keyword: 'range repair Wichita',
    shortDesc: 'Comprehensive repair for integrated stove and oven combi-units.',
    fullDesc: 'If your slide-in range or freestanding range has an issue with either the stovetop burners or the baking oven, we can service the entire unit in one visit. We diagnose complex electrical paths, gas lines, thermostat settings, and door seals, ensuring both cooking zones are safe and efficient for your Wichita home.',
    symptoms: [
      'Oven won\'t heat and stovetop igniters fail simultaneously',
      'Control panel buttons do not respond',
      'Burner flame is weak or burns yellow instead of blue',
      'Error code F9 or similar display malfunctions',
      'Range door won\'t lock for self-clean cycles'
    ],
    tips: [
      'Ensure the range is completely level to prevent oils and batters from pooling on one side.',
      'Check the range power plug; large 220V plugs can work loose and cut off oven power while letting clock run.',
      'Use specialized stove cleaner for glass surfaces to avoid chemical pitting.'
    ],
    faqs: [
      { q: 'Why is my gas range flame yellow?', a: 'A yellow flame indicates incomplete combustion, which can release carbon monoxide. It is often caused by dirty burner ports or improper air-to-gas ratios. Call us immediately to check and adjust the gas burners.' },
      { q: 'Can you repair a cracked range cooktop glass?', a: 'Yes, we can order and install an OEM replacement glass maintop for your specific range model, making it look brand new.' }
    ]
  },
  {
    id: 'cooktop-repair',
    name: 'Cooktop Repair',
    keyword: 'cooktop repair Wichita',
    shortDesc: 'Repair for cooktops, induction units, and gas burner ranges.',
    fullDesc: 'We specialize in repairing cooktops, built-in cooktops, and induction burners. Whether it\'s a failing radiant element under a ceramic surface, a bad spark igniter, or a broken potentiometer on your high-end cooktop, we bring premium parts and experience to resolve the issue.',
    symptoms: [
      'Induction burner does not detect pans',
      'Spark igniter sparks continuously even when burner is off',
      'Burner heating is erratic and inconsistent',
      'Electric coil element has hot spots or sparks',
      'Touch controls do not activate when pressed'
    ],
    tips: [
      'Always use induction-compatible magnetic cookware on induction cooktops.',
      'Clean spills immediately; burnt sugar can permanently pit glass-ceramic cooktops.',
      'Do not use abrasive steel wool pads to scrub burner caps.'
    ],
    faqs: [
      { q: 'Why does my gas cooktop keep clicking?', a: 'Continuous clicking is usually caused by moisture in the spark ignition switch (e.g. from boil-overs) or a faulty spark module. We can dry out the switches or replace the spark module.' },
      { q: 'What is the cost of replacing a cooktop element?', a: 'A standard replacement element runs between $150 to $250 including parts and labor, which is much cheaper than buying a new cooktop.' }
    ]
  },
  {
    id: 'ice-maker-repair',
    name: 'Ice Maker Repair',
    keyword: 'ice maker repair Wichita',
    shortDesc: 'Fix water leaks, hollow ice cubes, and slow production on ice makers.',
    fullDesc: 'No ice for your drinks? Or is your ice maker leaking and causing floor damage? We diagnose under-counter ice machines and built-in refrigerator ice makers in Wichita. We replace bad water valves, faulty mold heaters, broken ejector arms, and clogged water filters to bring back crisp, fresh ice.',
    symptoms: [
      'Ice cubes are hollow or misshapen',
      'No ice production at all',
      'Ice dispenser gets jammed or won\'t dispense',
      'Water leaks into the freezer or onto the floor',
      'Ice has a bad taste or odor'
    ],
    tips: [
      'Replace your refrigerator water filter every 6 months to maintain water flow and ice taste.',
      'If going on vacation, shut off the ice maker arm to prevent it from cycling while dry.',
      'Sanitize under-counter ice machines once a year to prevent mold build-up.'
    ],
    faqs: [
      { q: 'Why are my ice cubes hollow?', a: 'Hollow cubes are caused by low water pressure or a restricted water inlet valve, which shuts off water before the mold fills completely. We can replace the inlet valve to restore clean cubes.' },
      { q: 'Why did my ice maker stop working suddenly?', a: 'It could be a frozen fill tube, a failed water inlet valve, a tripped shut-off arm, or a broken gear assembly in the ice maker module itself.' }
    ]
  },
  {
    id: 'microwave-repair',
    name: 'Microwave Repair',
    keyword: 'microwave repair Wichita',
    shortDesc: 'Repair services for over-the-range and built-in microwaves.',
    fullDesc: 'If your built-in microwave or over-the-range microwave hood is sparking, not heating, or has a dead control panel, don\'t replace it just yet. Our techs can safely diagnose high-voltage capacitors, magnetrons, microswitches, and turntables, restoring quick heating convenience at a fraction of a replacement cost.',
    symptoms: [
      'Microwave runs but doesn\'t heat food',
      'Sparking or arcing inside the cavity',
      'Turntable does not rotate',
      'Exhaust fan or light doesn\'t work (over-the-range)',
      'Touchpad keys do not respond'
    ],
    tips: [
      'Never run the microwave empty; it can overheat the magnetron and burn it out.',
      'Clean food splatters off the waveguide cover (small cardboard-like panel on the side) to prevent sparks.',
      'Avoid slamming the microwave door, which can damage the delicate interlock safety switches.'
    ],
    faqs: [
      { q: 'Is it safe to repair a microwave?', a: 'Microwaves hold high voltage even when unplugged. Because of this, you should never open one yourself. Our technicians are certified to discharge the capacitor and make repairs safely.' },
      { q: 'Why is my microwave sparking?', a: 'Sparking is usually caused by exposed metal inside the microwave, a dirty waveguide cover, or damaged rack support hooks. We can clean the cavity and replace wave guides cheaply.' }
    ]
  },
  {
    id: 'garbage-disposal-repair',
    name: 'Garbage Disposal Repair',
    keyword: 'garbage disposal repair Wichita',
    shortDesc: 'Clear kitchen sink jams, humming motors, and slow leaks.',
    fullDesc: 'A jammed or leaking garbage disposal can cause bad odors and ruin your under-sink cabinetry. We provide fast, affordable garbage disposal repairs and replacements in Wichita. We can clear severe jams, fix faulty seals, or install a powerful new disposal unit in under an hour.',
    symptoms: [
      'Disposal hums but does not spin when switched on',
      'Water leaks from the bottom or sides of the unit',
      'Sink drains very slowly or backs up completely',
      'Foul odor coming from the disposal collar',
      'No sound or response (tripped breaker or overload)'
    ],
    tips: [
      'Always run cold water before, during, and after running your garbage disposal.',
      'Do not put fibrous items (onion skins, celery, corn husks) or grease down the disposal.',
      'Grind ice cubes and lemon peels to clean the blades and freshen the drain smell.'
    ],
    faqs: [
      { q: 'How do I reset my garbage disposal?', a: 'Look for a small red button on the bottom of the unit. Press it to reset the thermal overload. If it trips again immediately, the motor is jammed or shorted.' },
      { q: 'Why is my disposal leaking from the bottom?', a: 'Leaks from the bottom casing usually indicate that an internal seal has failed and the motor is corroded. In this case, replacing the disposal is the best recommendation.' }
    ]
  },
  {
    id: 'wine-cooler-repair',
    name: 'Wine Cooler Repair',
    keyword: 'wine cooler repair Wichita',
    shortDesc: 'Protect your wine collection with specialized temperature calibrations.',
    fullDesc: 'Keep your vintage wines at the perfect cellaring temperature. We repair built-in wine refrigerators, dual-zone coolers, and beverage centers in Wichita. We resolve thermostat failures, compressor overloads, digital board errors, and door gasket leaks, protecting your wines from spoilage.',
    symptoms: [
      'Wine cooler fails to reach set temperature',
      'Dual-zone chambers have identical temperatures',
      'Condensation forming inside the glass door',
      'Clicking noises or fan rattling',
      'Internal lights or digital controls are dead'
    ],
    tips: [
      'Ensure the wine cooler has proper ventilation around the cabinet to prevent overheating.',
      'Keep the door gasket clean; a bad seal allows warm air in, causing mold and temperature spikes.',
      'Do not overload shelves; air must circulate freely around the bottles.'
    ],
    faqs: [
      { q: 'Why is my wine cooler not cooling?', a: 'It could be a bad thermostat, a failing starter relay on the compressor, a dirty condenser, or a malfunctioning control board. We can pinpoint the issue and repair it.' },
      { q: 'What is the ideal temperature for red and white wine?', a: 'Ideally, red wines should be cellared at 55°F (13°C) and whites at 45°F-50°F (7°C-10°C). Many dual-zone coolers let you set these zones separately.' }
    ]
  },
  {
    id: 'air-conditioner-repair',
    name: 'Air Conditioner Repair',
    keyword: 'air conditioner repair Wichita',
    shortDesc: 'Keep cool in Wichita summers with fast, reliable AC condenser repairs.',
    fullDesc: 'When the Kansas summer heat hits, a broken air conditioner is an absolute emergency. We diagnose and repair central air conditioners, heat pumps, and ductless systems. We replace bad capacitors, contactor switches, fan motors, and locate refrigerant leaks, restoring cold air to your home quickly.',
    symptoms: [
      'AC blows warm air from the vents',
      'Outdoor condenser unit is not spinning or running',
      'Ice forming on the copper coils or evaporator',
      'AC cycles on and off rapidly (short-cycling)',
      'Water leaking near the indoor furnace/air handler'
    ],
    tips: [
      'Change your air filters every 30 to 90 days to maintain airflow and prevent frozen coils.',
      'Keep weeds, leaves, and debris cleared away from the outdoor condenser unit.',
      'Have a professional tune-up your system every spring before the hot weather starts.'
    ],
    faqs: [
      { q: 'Why is my AC blowing warm air?', a: 'This is often caused by a dirty air filter blocking air flow, a bad capacitor preventing the outdoor compressor from starting, or low refrigerant levels.' },
      { q: 'How often should I change my AC filter?', a: 'Every 3 months is standard. If you have pets or allergies, change it monthly to keep the air clean and system load low.' }
    ]
  },
  {
    id: 'commercial-appliance-repair',
    name: 'Commercial Appliance Repair',
    keyword: 'commercial appliance repair Wichita',
    shortDesc: 'Minimize business downtime with commercial refrigeration, oven, and washer services.',
    fullDesc: 'A broken appliance in a restaurant, laundromat, or office can stop your business operations and cost you revenue. We understand the urgency of commercial repairs in Wichita. We service commercial reach-in coolers, commercial dryers, washers, griddles, and ice machines with rapid response times and heavy-duty parts.',
    symptoms: [
      'Commercial freezer temperature rising above safe storage levels',
      'Commercial washer fails to spin or drain mid-cycle',
      'Heavy duty kitchen equipment won\'t heat or regulate temperature',
      'Excessive noise during high-speed commercial spin cycles',
      'Leaking water or commercial gas line concerns'
    ],
    tips: [
      'Establish a preventive maintenance schedule to clean coils, filters, and gaskets regularly.',
      'Train staff to report minor issues (like squeaks or slow draining) before they cause total breakdown.',
      'Only use certified parts designed for commercial-grade duty cycles.'
    ],
    faqs: [
      { q: 'Do you offer priority service for local businesses?', a: 'Yes! We prioritize commercial clients to minimize business disruption. Call us for rapid scheduling.' },
      { q: 'Are your technicians certified for commercial equipment?', a: 'Yes, our technicians are fully licensed, insured, and experienced in heavy-duty commercial appliances.' }
    ]
  },
  {
    id: 'emergency-appliance-repair',
    name: 'Emergency Appliance Repair',
    keyword: 'emergency appliance repair Wichita',
    shortDesc: '24/7 same-day rapid response for leaks, warming freezers, and gas issues.',
    fullDesc: 'Some appliance problems cannot wait until tomorrow. A flooding dishwasher, a thawing walk-in freezer, or a gas stove showing leak symptoms require immediate attention. Rick Nees Appliance Repair offers priority dispatch for emergency appliance repairs in Wichita and surrounding counties.',
    symptoms: [
      'Rapidly flooding appliance (dishwasher or washer)',
      'Refrigerator/freezer thawing with valuable stock',
      'Gas smell near stove, oven, or dryer',
      'Severe electrical sparkling or smoke from appliance',
      'Commercial refrigeration breakdowns'
    ],
    tips: [
      'Locate the main water shut-off valve for your appliances in case of a flood.',
      'If you smell gas, shut off the gas valve immediately, open windows, and step outside before calling.',
      'Keep refrigerator and freezer doors closed during a power/appliance failure to preserve cold air.'
    ],
    faqs: [
      { q: 'Do you charge extra for emergency calls?', a: 'We offer fair, honest pricing. We will detail any after-hours or immediate dispatch fees transparently over the phone before we send a technician.' },
      { q: 'How fast can you get a technician to my house?', a: 'For emergencies in Wichita, we typically arrive within 1 to 2 hours of the call depending on dispatcher availability.' }
    ]
  }
];

export const citiesData: CityData[] = [
  {
    id: 'wichita',
    name: 'Wichita',
    zips: ['67202', '67203', '67204', '67205', '67206', '67207', '67208', '67212', '67213', '67214', '67218', '67226'],
    landmarks: ['Keeper of the Plains', 'Exploration Place', 'Sedgwick County Zoo', 'Wichita State University'],
    neighborhoods: ['College Hill', 'Delano', 'Riverside', 'Eastborough', 'Old Town', 'Crown Heights'],
    intro: 'As Wichita\'s go-to appliance repair provider for over 40 years, we service every neighborhood in the ICT metro. From historic homes in College Hill to new developments in West Wichita, we deliver same-day repair service with honest pricing.',
    highlights: [
      'Headquartered locally in Wichita, KS',
      'Same-day service call availability across all zip codes',
      'Experienced with historic home plumbing and electrical nuances'
    ],
    faq: [
      { q: 'How quickly can you repair appliances in Wichita?', a: 'Since we are based locally, we often have a technician near you and can offer same-day service for bookings made in the morning.' },
      { q: 'Are you licensed to work on gas appliances in Wichita?', a: 'Yes, we are fully licensed, insured, and certified for both gas and electric appliance repairs in the City of Wichita.' }
    ]
  },
  {
    id: 'derby',
    name: 'Derby',
    zips: ['67037'],
    landmarks: ['Rock Regional Hospital', 'High Park', 'Derby Marketplace'],
    neighborhoods: ['Stone Creek', 'Oakwood Valley', 'El Paso'],
    intro: 'Derby residents deserve prompt, professional service. We regularly dispatch technicians down Rock Road to serve homeowners in Derby, KS, repairing refrigerators, laundry machines, and kitchen ranges quickly.',
    highlights: [
      'Frequent service routes to Derby, Kansas',
      'Local technicians familiar with the Derby area',
      'Prompt response for homes near High Park and local schools'
    ],
    faq: [
      { q: 'Do you charge extra travel fees for Derby?', a: 'No. Derby is within our standard service area. You pay the same flat diagnostic fee as our Wichita customers.' }
    ]
  },
  {
    id: 'andover',
    name: 'Andover',
    zips: ['67002'],
    landmarks: ['Andover Central High School', '13th Street Sports Park', 'Terradyne Country Club'],
    neighborhoods: ['Crescent Lakes', 'Prairie Creek', 'Flint Hills'],
    intro: 'Serving Andover, KS, with high-end residential appliance repairs. We regularly service premium brands like Sub-Zero, Wolf, and Bosch in Andover\'s golf and family communities.',
    highlights: [
      'Specialized experience with luxury appliance brands in Andover',
      'Same-day appointments for busy families',
      'Licensed technicians passing comprehensive background checks'
    ],
    faq: [
      { q: 'Can you repair high-end built-in appliances in Andover?', a: 'Absolutely. We specialize in luxury brands like Sub-Zero, Wolf, Viking, and Thermador, commonly found in Andover homes.' }
    ]
  },
  {
    id: 'bel-aire',
    name: 'Bel Aire',
    zips: ['67220', '67226'],
    landmarks: ['Bel Aire City Hall', 'Wichita Country Club (nearby)'],
    neighborhoods: ['Central Park', 'Elk Creek', 'Highland Park'],
    intro: 'Quiet neighborhoods in Bel Aire deserve fast response times. We cover the entire Bel Aire community, bringing prompt appliance repair to your doorstep.',
    highlights: [
      'Local routes covering Bel Aire daily',
      'Expert stove, oven, and refrigerator repair',
      'Same-day service available'
    ],
    faq: [
      { q: 'Do you service Bel Aire on weekends?', a: 'Yes, we provide emergency weekend service for critical appliance failures like leaking dishwashers or warm freezers.' }
    ]
  },
  {
    id: 'park-city',
    name: 'Park City',
    zips: ['67147'],
    landmarks: ['Hartman Arena', 'Park City Public Library'],
    neighborhoods: ['Chisholm Trail', 'Valley Park'],
    intro: 'Located just north of Wichita, Park City homeowners trust Rick Nees Appliance Repair to keep their washers, dryers, and kitchen appliances working correctly.',
    highlights: [
      'Prompt response for homes near Hartman Arena',
      'Same-day repair service',
      '100% satisfaction guarantee'
    ],
    faq: [
      { q: 'Which brands do you service in Park City?', a: 'We service all major brands, including Samsung, Whirlpool, LG, GE, Maytag, and Kenmore.' }
    ]
  },
  {
    id: 'maize',
    name: 'Maize',
    zips: ['67101'],
    landmarks: ['Maize High School', 'Maize South High School'],
    neighborhoods: ['Carriage Crossing', 'Watercress', 'Maize Northwest'],
    intro: 'The fast-growing community of Maize, KS is a core part of our service area. We support local families with reliable scheduling and fast, same-day appliance fixes.',
    highlights: [
      'Daily service routes in Maize, KS',
      'Experienced in newer appliance electronics and sensors',
      'Same-day repair booking'
    ],
    faq: [
      { q: 'Do you repair smart appliances in Maize?', a: 'Yes, our technicians are trained in the latest smart-home appliance brands and digital diagnostics.' }
    ]
  },
  {
    id: 'goddard',
    name: 'Goddard',
    zips: ['67052'],
    landmarks: ['Goddard Linear Park', 'Tanganyika Wildlife Park'],
    neighborhoods: ['Oak Ridge', 'Wildwood', 'Elk Ridge'],
    intro: 'Serving Goddard, KS homeowners with expert appliance diagnostics and repair. We fix everything from garbage disposals to commercial-grade kitchen equipment.',
    highlights: [
      'Goddard area residential specialists',
      'Licensed, bonded, and fully insured',
      'Warranty provided on all parts and labor'
    ],
    faq: [
      { q: 'How long are your warranties on repairs in Goddard?', a: 'We offer an industry-leading warranty on both parts and labor, typically 90 days to a year depending on the OEM component.' }
    ]
  },
  {
    id: 'haysville',
    name: 'Haysville',
    zips: ['67060'],
    landmarks: ['Haysville Historic District', 'Riggs Park'],
    neighborhoods: ['Timberlane', 'Peach Tree', 'Haysville South'],
    intro: 'Haysville residents count on Rick Nees for professional appliance repairs. We arrive on time, diagnose the problem honestly, and repair it right the first time.',
    highlights: [
      'Serving Haysville homes for 40 years',
      'Flat-rate honest diagnostic fee',
      'Local technicians who respect your home'
    ],
    faq: [
      { q: 'Do you fix older appliances in Haysville?', a: 'Yes! We have parts access for appliances that are 10-20 years old and have the experience to repair them reliably.' }
    ]
  },
  {
    id: 'valley-center',
    name: 'Valley Center',
    zips: ['67147'],
    landmarks: ['Valley Center High School', 'McLaughlin Park'],
    neighborhoods: ['Meadowlark', 'Northfields', 'Valley Creek'],
    intro: 'We bring high-quality appliance repair north to Valley Center, KS. Don\'t let a broken refrigerator or leaking dishwasher spoil your week.',
    highlights: [
      'Dedicated service scheduling for Valley Center',
      'Emergency repairs available',
      'Honest, local service technicians'
    ],
    faq: [
      { q: 'How do I book service in Valley Center?', a: 'You can call us directly at (316) 213-1874 or use our convenient online booking form to secure your spot.' }
    ]
  },
  {
    id: 'augusta',
    name: 'Augusta',
    zips: ['67010'],
    landmarks: ['Augusta City Lake', 'Historic Augusta Theatre'],
    neighborhoods: ['Lakeside', 'Augusta North'],
    intro: 'We service Augusta, KS, providing top-notch repairs for refrigerators, ranges, washers, and dryers. Experience the peace of mind of local, honest service.',
    highlights: [
      'Routes covering Augusta, KS',
      'Same-day service capability',
      'Family-owned business trust'
    ],
    faq: [
      { q: 'Do you service commercial properties in Augusta?', a: 'Yes, we offer commercial appliance repairs for Augusta restaurants, offices, and commercial facilities.' }
    ]
  },
  {
    id: 'mulvane',
    name: 'Mulvane',
    zips: ['67110'],
    landmarks: ['Kansas Star Casino', 'Mulvane Historical Museum'],
    neighborhoods: ['Mulvane East', 'Casino Area'],
    intro: 'Mulvane homeowners trust Rick Nees Appliance Repair for speed and quality. We specialize in same-day repairs for major appliance brands.',
    highlights: [
      'Servicing Mulvane, Kansas',
      'Available for emergency callouts',
      'Fully licensed and insured'
    ],
    faq: [
      { q: 'Can you service appliances near the Kansas Star Casino?', a: 'Yes, we cover the entire Mulvane area, including both residential homes and commercial business properties.' }
    ]
  },
  {
    id: 'clearwater',
    name: 'Clearwater',
    zips: ['67026'],
    landmarks: ['Clearwater Historical Museum', 'Chisholm Trail Sports Complex'],
    neighborhoods: ['Clearwater North', 'Chisholm Ridge'],
    intro: 'Clearwater residents trust us to deliver friendly, honest appliance repair services. We fix washers, ovens, stoves, and dryers on the first visit.',
    highlights: [
      'Clearwater service availability',
      'Trucks stocked with common OEM parts',
      'No-hassle booking policy'
    ],
    faq: [
      { q: 'Is same-day service available in Clearwater?', a: 'Yes, depending on our daily technician route sheets, we can often schedule same-day repair service in Clearwater.' }
    ]
  },
  {
    id: 'rose-hill',
    name: 'Rose Hill',
    zips: ['67133'],
    landmarks: ['Rose Hill High School', 'Shorty Cox Park'],
    neighborhoods: ['Siena', 'Rose Hill East'],
    intro: 'We support the Rose Hill, KS community with professional home service. Get your refrigerator, dishwasher, or range repaired quickly by local experts.',
    highlights: [
      'Serving Rose Hill families',
      'Experienced in all major brands',
      'Same-day scheduling'
    ],
    faq: [
      { q: 'Do you charge a diagnostic fee in Rose Hill?', a: 'Yes, we charge a standard diagnostic fee to cover travel and technician time, which is waived when you approve the repair.' }
    ]
  },
  {
    id: 'kechi',
    name: 'Kechi',
    zips: ['67067'],
    landmarks: ['Kechi City Park', 'Karg Art Glass'],
    neighborhoods: ['Kechi North', 'Karg Community'],
    intro: 'For over 40 years, we have provided Kechi, KS with exceptional appliance repair services. We repair refrigerators, ovens, and washers with speed and integrity.',
    highlights: [
      'Kechi area local service',
      'Highly rated customer support',
      'Fast, same-day repairs'
    ],
    faq: [
      { q: 'Are you available to fix Kechi appliances today?', a: 'Yes, call (316) 213-1874 to check today\'s availability for Kechi.' }
    ]
  },
  {
    id: 'colwich',
    name: 'Colwich',
    zips: ['67030'],
    landmarks: ['Colwich City Hall', 'Andale/Colwich Area Schools'],
    neighborhoods: ['Colwich Center', 'Colwich North'],
    intro: 'Colwich homeowners count on our rapid response times. We fix dryers, freezers, ice makers, and garbage disposals on-site with local expertise.',
    highlights: [
      'Colwich area coverage',
      'Certified and background-checked technicians',
      'Honest repair vs replace advice'
    ],
    faq: [
      { q: 'Will you let me know if it\'s better to replace my appliance?', a: 'Yes, our core value is honesty. If a repair is not economical, we will tell you and help you make the best decision.' }
    ]
  }
];

export const brandsData: BrandData[] = [
  { name: 'Samsung', description: 'Samsung smart refrigerators, washers, and dryer systems require certified electronic diagnostics.', tip: 'Regularly update your Samsung app to monitor refrigerator sensors.' },
  { name: 'LG', description: 'LG DirectDrive washers and linear compressor refrigerators are highly efficient but complex.', tip: 'Keep LG compressor vents clear of lint and dust to prevent premature wear.' },
  { name: 'GE', description: 'General Electric offers highly durable kitchen ranges, ovens, and dishwashers.', tip: 'Check GE burner caps periodically to ensure igniter ports are clean.' },
  { name: 'Whirlpool', description: 'Whirlpool washers, dryers, and refrigerator units are highly popular and reliable.', tip: 'Replace Whirlpool water filter regularly to avoid slow ice production.' },
  { name: 'KitchenAid', description: 'KitchenAid specialized built-in refrigerators and dishwashers require skilled care.', tip: 'Run cleaning cycles regularly to protect KitchenAid stainless steel tubs.' },
  { name: 'Maytag', description: 'Maytag commercial-grade residential washers and dryers are built to last.', tip: 'Clean Maytag lint traps after every cycle to maintain drying efficiency.' },
  { name: 'Bosch', description: 'Bosch premium quiet dishwashers feature advanced sensor and heating technologies.', tip: 'Clean the bottom mesh filter on Bosch dishwashers to prevent pool leaks.' },
  { name: 'Frigidaire', description: 'Frigidaire offers affordable, high-quality refrigerators, freezers, and ranges.', tip: 'Do not overload Frigidaire freezer bins, which blocks auto-defrost airflow.' },
  { name: 'Amana', description: 'Amana laundry machines and basic refrigerators are simple and easy to service.', tip: 'Simple component cleaning often solves Amana heating issues.' },
  { name: 'Kenmore', description: 'Kenmore appliances are manufactured by Whirlpool, LG, and others.', tip: 'Provide the model number prefix to help our techs identify the original manufacturer.' },
  { name: 'Speed Queen', description: 'Speed Queen manufactures heavy-duty commercial-grade washers and dryers.', tip: 'Speed Queens rarely fail, but when they do, use only original OEM steel parts.' },
  { name: 'Electrolux', description: 'Electrolux premium front-load washers and dryers feature delicate electronic circuits.', tip: 'Use only high-efficiency (HE) detergent in Electrolux washers to avoid suds errors.' },
  { name: 'Sub-Zero', description: 'Sub-Zero high-end built-in refrigeration requires specialized diagnostic training.', tip: 'Vacuum Sub-Zero top-mounted condenser coils every 6 months without fail.' },
  { name: 'Viking', description: 'Viking commercial-style home ranges and cooktops require precise gas adjustments.', tip: 'Ensure Viking burner grates are properly seated for correct flame heights.' },
  { name: 'JennAir', description: 'JennAir downdraft ranges and luxury kitchen appliances require advanced repair skills.', tip: 'Check JennAir exhaust filters weekly if you do heavy pan frying.' },
  { name: 'Thermador', description: 'Thermador column refrigeration and professional ranges offer state-of-the-art tech.', tip: 'Use Thermador\'s built-in self-diagnostics to retrieve error codes for our dispatchers.' },
  { name: 'Wolf', description: 'Wolf high-end ovens, ranges, and cooktops are the gold standard for home chefs.', tip: 'Never line the bottom of Wolf ovens with foil, as it ruins the porcelain finish.' }
];

export const blogPostsData: BlogPostData[] = [
  {
    id: 'blog-1',
    title: 'Why Your Dryer Isn\'t Heating: Common Causes & How to Fix It',
    slug: 'why-your-dryer-isnt-heating',
    date: 'June 18, 2026',
    readTime: '5 min read',
    category: 'Dryer Maintenance',
    summary: 'Discover the most common reasons electric and gas dryers tumble but fail to produce heat, and learn when to call a professional.',
    content: `A dryer that tumbles but doesn't produce heat is one of the most common complaints we receive in Wichita. Instead of running your damp clothes through a three-hour cycle, let's look at the primary reasons your dryer is blowing cold air.\n\n### 1. Tripped Thermal Fuse\nThe thermal fuse is a critical safety device designed to shut off power to the heating circuit if the dryer overheats. This fuse is typically located near the exhaust duct. If your dryer vent is clogged with lint, the heat builds up, and the fuse blows. Once it blows, the dryer might still run, but it won't heat up. It must be replaced.\n\n### 2. Burned-Out Heating Element (Electric Dryers)\nElectric dryers rely on a metal coil heating element to warm the air. Over time, these coils can crack or burn out, creating an open electrical circuit. You can test the element for continuity using a multimeter. If there is no continuity, the element must be replaced.\n\n### 3. Faulty Gas Solenoids (Gas Dryers)\nIf you own a gas dryer, the burner assembly relies on solenoids (gas valve coils) to open the valve and let gas flow. If these coils fail, the igniter may glow, but the flame will never light. Replacing gas solenoids is a common, inexpensive repair.\n\n### 4. Broken Igniter\nSimilar to a gas stove, a gas dryer has an igniter that heats up to light the gas flame. If the igniter is cracked or burned out, it won't spark the gas, and the dryer will blow cold air.\n\n### 5. Clogged Dryer Vents\nAirflow is the lifeblood of your dryer. If your exhaust vent is full of lint, the damp air cannot escape, and the safety thermostats will cycle the heater off to prevent a fire. Cleaning your dryer vent is the first step in troubleshooting any heating issue.`
  },
  {
    id: 'blog-2',
    title: '5 Signs Your Refrigerator Compressor Is Failing',
    slug: 'signs-refrigerator-compressor-failing',
    date: 'June 15, 2026',
    readTime: '6 min read',
    category: 'Refrigerator Repair',
    summary: 'The compressor is the heart of your refrigerator. Learn the early warning signs of compressor failure so you can act before your food spoils.',
    content: `The compressor is the most expensive and critical component in your refrigerator. It pumps refrigerant through the system, absorbing heat and keeping your food fresh. When a compressor starts failing, it is only a matter of time before the unit breaks down completely. Here are the five key warning signs to watch out for.\n\n### 1. Refrigerator Is Warm but Freezer Is Cold\nOften, a compressor that is starting to struggle will fail to maintain the low temperatures required for the fresh food section, while the freezer remains cold. If your milk is spoiling early, check the thermostat setting and listen for compressor cycles.\n\n### 2. Constant Clicking Noises\nIf you hear a distinct "click" coming from the bottom rear of your refrigerator every few minutes, your compressor is likely overloading. The clicking is the start relay attempting to kickstart the compressor, followed by the thermal overload switch tripping because the compressor is drawing too much current.\n\n### 3. The Fridge Runs Constantly\nIn normal conditions, a refrigerator should cycle on and off throughout the day. If your fridge is running 24/7 without ever pausing, it means the compressor cannot build enough pressure to reach the target temperature. This will drastically increase your energy bill and burn out the compressor motor.\n\n### 4. Excessive Noise or Rattling\nWhile refrigerators make some humming noises, a loud rattling, buzzing, or grinding sound when the compressor shuts off is a sign of internal mechanical damage. The compressor pump mounts may have broken, causing the pump to hit the outer metal casing.\n\n### 5. Tripping the Circuit Breaker\nIf your kitchen circuit breaker trips every time your refrigerator kicks on, the compressor has likely suffered an electrical short. This is a severe failure that requires immediate professional diagnostics.`
  },
  {
    id: 'blog-3',
    title: 'Washer Not Draining? How to Troubleshoot Standing Water',
    slug: 'washer-not-draining',
    date: 'June 10, 2026',
    readTime: '4 min read',
    category: 'Washer Maintenance',
    summary: 'Standing water in your washer drum is a messy problem. Follow this step-by-step guide to locate clogs and drain your washing machine safely.',
    content: `Nothing ruins laundry day like opening your washer to find your clothes floating in a tub of dirty, stagnant water. A washer that won't drain is a common issue, but the solution is often simpler than you think. Here is how to troubleshoot a drainage failure.\n\n### 1. Check the Drain Hose for Kinks\nBefore opening any valves, pull the washer away from the wall and inspect the grey ribbed drain hose. If it is pinched behind the washer or kinked, water cannot escape. Straighten the hose and try running a spin cycle.\n\n### 2. Clean the Drain Pump Filter (Front-Loaders)\nMost front-load washers have a small access door at the bottom front panel. Behind this door is a screw-out drain pump filter. Place a shallow pan and towels on the floor, unscrew the cap slowly, and let the water drain out. You will likely find coins, bobby pins, socks, or lint blocking the filter. Clean it and screw it back in tightly.\n\n### 3. Inspect the Garbage Disposal Connection\nIf you recently installed a new garbage disposal and your washer or dishwasher stopped draining immediately after, the installer likely forgot to knock out the plastic drain plug inside the disposal's inlet nipple. Unscrew the drain hose from the disposal and knock out the plug using a screwdriver and hammer.\n\n### 4. Listen to the Pump Motor\nWhen the washer enters the drain cycle, do you hear a humming sound, or is it completely silent? A humming sound with no water movement suggests the pump is jammed by an object. Complete silence indicates a failed pump motor or a broken wire. A professional can quickly swap out the drain pump for you.`
  },
  {
    id: 'blog-4',
    title: 'Dishwasher Not Cleaning? Get Sparkling Results Again',
    slug: 'dishwasher-not-cleaning',
    date: 'June 05, 2026',
    readTime: '5 min read',
    category: 'Dishwasher Tips',
    summary: 'If your dishwasher is leaving a white film, spots, or food particles on your plates, try these easy DIY cleaning and loading fixes.',
    content: `If you are rinsing your dishes completely before loading them, or re-washing them by hand afterwards, your dishwasher is not doing its job. A dishwasher should be able to remove grease and food residue without help. Let's look at why your dishwasher is leaving dishes dirty.\n\n### 1. Clogged Spray Arm Jets\nOver time, seeds, glass shards, and hard water minerals can clog the tiny holes in the upper and lower spray arms. If these holes are blocked, water cannot spray with enough pressure to clean. Pop the spray arms out and clear the jets using a toothpick or sewing needle.\n\n### 2. Dirty Mesh Filter\nAt the bottom of your dishwasher tub is a round mesh filter. If you haven't cleaned it in months, it is likely coated in grease and food debris. The dishwasher recirculates this dirty water, spraying food particles back onto your clean dishes. Twist the filter counter-clockwise, pull it out, wash it with warm soapy water, and replace it.\n\n### 3. Failing Heating Element\nDishwashers need water heated to 120°F-140°F to dissolve detergent and melt grease. If your dishwasher heating element is burned out or coated in calcium, the water stays cold, and the detergent will not activate. If your dishes are cold and wet at the end of a cycle, the heating element likely needs replacement.\n\n### 4. Poor Loading Practices\nLoading dishes too tightly blocks the spray path. Avoid nesting bowls or putting tall trays near the spray arm rotation path. Make sure the soap dispenser door can open freely without hitting a large plate.`
  },
  {
    id: 'blog-5',
    title: 'Repair vs. Replace: When to Say Goodbye to an Appliance',
    slug: 'repair-vs-replace-appliances',
    date: 'May 28, 2026',
    readTime: '7 min read',
    category: 'Appliance Guide',
    summary: 'Use the 50% rule and average lifespan charts to decide whether you should repair your existing appliance or buy a new model.',
    content: `When a major appliance breaks down, homeowners are faced with a tough choice: pay for a repair or buy a new replacement? While replacing seems like a simple fix, new appliances can be expensive and don't always last as long as older, heavy-duty models. Here is how to make an informed, budget-friendly decision.\n\n### The 50% Rule of Appliance Repair\nAs a general rule of thumb, if the appliance is more than halfway through its expected lifespan, and the cost of the repair is more than 50% of the price of a brand-new appliance, it is usually better to replace it. If the repair is cheaper or the appliance is relatively new, repairing is almost always the smarter financial choice.\n\n### Average Lifespan of Home Appliances\n- **Refrigerators:** 10 - 14 years\n- **Washing Machines:** 8 - 12 years\n- **Dryers:** 10 - 14 years\n- **Dishwashers:** 7 - 10 years\n- **Ovens/Ranges:** 12 - 15 years\n- **Microwaves:** 5 - 8 years\n\n### Environmental Impact\nRepairing keeps heavy steel and electronic waste out of our landfills. If your appliance can be restored with a simple part swap, you reduce your environmental footprint significantly.\n\nAt Rick Nees Appliance Repair, we value honesty above all. Our technician will examine your appliance and tell you flat-out if a repair is a bad investment. We want to earn your trust for the next 40 years, not just make a quick buck.`
  },
  {
    id: 'blog-6',
    title: 'How to Extend the Life of Your Home Appliances',
    slug: 'how-to-extend-appliance-life',
    date: 'May 15, 2026',
    readTime: '6 min read',
    category: 'Maintenance Tips',
    summary: 'Simple monthly habits can add years of reliable service to your washer, dryer, refrigerator, and dishwasher. Read our expert checklist.',
    content: `Major appliances represent a significant financial investment in your home. With basic preventive maintenance, you can extend their lifespan by several years, improve energy efficiency, and prevent costly breakdown emergencies. Here is our expert checklist.\n\n### 1. Vacuum Refrigerator Coils\nCoated coils cannot release heat efficiently, forcing the compressor to work twice as hard. Pull your fridge out and vacuum the coils under or behind the unit twice a year.\n\n### 2. Keep Dryer Vents Clear\nClogged vents choke your dryer, leading to longer drying times and thermal fuse failure. Clean the exhaust duct annually and clear lint screens after every load.\n\n### 3. Don\'t Overload the Washer\nHeavy loads damage suspension rods, strip drive gears, and wear out the motor. Keep loads balanced and wash extra-large items at a laundromat.\n\n### 4. Clean Dishwasher Seals\nFood acids eat away at rubber door seals. Wipe down the gaskets monthly with white vinegar to prevent leaks.`
  },
  {
    id: 'blog-7',
    title: 'Top 7 Appliance Maintenance Tips for Spring',
    slug: 'best-appliance-maintenance-tips',
    date: 'April 20, 2026',
    readTime: '5 min read',
    category: 'Spring Maintenance',
    summary: 'Prepare your home for the warm months ahead with these essential spring appliance checks.',
    content: `Spring is the perfect time to give your hardworking home appliances some attention. These seven quick maintenance checks will keep your systems running smoothly all summer long.\n\n### 1. Check Refrigerator Gaskets\nWipe door seals with warm soapy water to ensure a tight lock. Worn seals let cool air escape, making your fridge run warm.\n\n### 2. Inspect Washer Hoses\nRubber inlet hoses can dry rot and burst, causing massive flooding. Inspect hoses for cracks or bulges, and replace them with braided stainless steel hoses every 5 years.\n\n### 3. Clean the Garbage Disposal\nGrind ice cubes and lemon peels to sharpen blades and remove built-up odors.\n\n### 4. Check Outdoor AC Condenser\nClear away weeds, leaves, and dirt from your outdoor air conditioner unit to ensure proper airflow.`
  }
];
