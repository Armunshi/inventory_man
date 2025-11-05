// Generated Prisma seed script from amazon.csv
// Save this as seed_from_amazon.js and run with: node seed_from_amazon.js
// Requires prisma client and a working DATABASE_URL environment variable.
// This script will upsert suppliers, insert products (198 rows), and create Inventory entries
// distributing products evenly across warehouses 1,2,3 (66 each).

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // 1) Upsert suppliers (create if not exists)
  const supplierEmails = [
  "supplier@example.com",
  "supplier2@example.com",
  "supplier3@example.com",
  "supplier4@example.com",
  "supplier5@example.com",
  "supplier6@example.com",
  "supplier7@example.com",
  "supplier8@example.com",
  "supplier9@example.com"
];
  const supplierIds = [5,6,7,8,9,10,11,12,13,14];

  
  // 2) Create products (using data parsed from CSV)
  const productsData = [
  {
    "name": "Wayona Nylon Braided USB to Lightning Fast Charging and Data Sync Cable Compatible for iPhone 13, 12,11, X, 8, 7, 6, 5, iPad Air, Pro, Mini (3 FT Pack of 1, Grey)",
    "category": "Computers&Accessories|Accessories&Peripherals|Cables&Accessories|Cables|USBCable",
    "imageUrl": "https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/51UsScvHQNL._SX300_SY300_QL70_FMwebp_.jpg",
    "description": "High Compatibility : Compatible With iPhone 12, 11, X/XsMax/Xr ,iPhone 8/8 Plus,iPhone 7/7 Plus,iPhone 6s/6s Plus,iPhone 6/6 Plus,iPhone 5/5s/5c/se,iPad Pro,iPad Air 1/2,iPad mini 1/2/3,iPod nano7,iPod touch and more apple devices.|Fast Charge&Data Sync : It can charge and sync simultaneously at a rapid speed, Compatible with any charging adaptor, multi-port charging station or power bank.|Durability : Durable nylon braided design with premium aluminum housing and toughened nylon fiber wound tightly around the cord lending it superior durability and adding a bit to its flexibility.|High Security Level : It is designed to fully protect your device from damaging excessive current.Copper core thick+Multilayer shielding, Anti-interference, Protective circuit equipment.|WARRANTY: 12 months warranty and friendly customer services, ensures the long-time enjoyment of your purchase. If you meet any question or problem, please don't hesitate to contact us.",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-07-10T07:43:45.807260Z",
    "updatedAt": "2025-10-28T13:11:17.807301Z"
  },
  {
    "name": "Ambrane Unbreakable 60W / 3A Fast Charging 1.5m Braided Type C Cable for Smartphones, Tablets, Laptops & other Type C devices, PD Technology, 480Mbps Data Sync, Quick Charge 3.0 (RCT15A, Black)",
    "category": "Computers&Accessories|Accessories&Peripherals|Cables&Accessories|Cables|USBCable",
    "imageUrl": "https://m.media-amazon.com/images/W/WEBP_402378-T2/images/I/31zOsqQOAOL._SY445_SX342_QL70_FMwebp_.jpg",
    "description": "Compatible with all Type C enabled devices, be it an android smartphone (Mi, Samsung, Oppo, Vivo, Realme, OnePlus, etc), tablet, laptop (Macbook, Chromebook, etc)|Supports Quick Charging (2.0/3.0)|Unbreakable \u2013 Made of special braided outer with rugged interior bindings, it is ultra-durable cable that won\u2019t be affected by daily rough usage|Ideal Length \u2013 It has ideal length of 1.5 meters which is neither too short like your typical 1meter cable or too long like a 2meters cable|Supports maximum 3A fast charging and 480 Mbps data transfer speed|6 months manufacturer warranty from the date of purchase",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-05-26T01:21:41.807520Z",
    "updatedAt": "2025-10-05T06:31:42.807537Z"
  },
  {
    "name": "Sounce Fast Phone Charging Cable & Data Sync USB Cable Compatible for iPhone 13, 12,11, X, 8, 7, 6, 5, iPad Air, Pro, Mini & iOS Devices",
    "category": "Computers&Accessories|Accessories&Peripherals|Cables&Accessories|Cables|USBCable",
    "imageUrl": "https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/31IvNJZnmdL._SY445_SX342_QL70_FMwebp_.jpg",
    "description": "\u3010 Fast Charger& Data Sync\u3011-With built-in safety proctections and four-core copper wires promote maximum signal quality and strength and enhance charging & data transfer speed with up to 480 mb/s transferring speed.|\u3010 Compatibility\u3011-Compatible with iPhone 13, 12,11, X, 8, 7, 6, 5, iPad Air, Pro, Mini & iOS devices.|\u3010 Sturdy & Durable\u3011-The jacket and enforced connector made of TPE and premium copper, are resistant to repeatedly bending and coiling.|\u3010 Ultra High Quality\u3011: According to the experimental results, the fishbone design can accept at least 20,000 bending and insertion tests for extra protection and durability. Upgraded 3D aluminum connector and exclusive laser welding technology, which to ensure the metal part won't break and also have a tighter connection which fits well even with a protective case on and will never loose connection.|\u3010 Good After Sales Service\u3011-Our friendly and reliable customer service will respond to you within 24 hours ! you can purchase with confidence,and ",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-05-09T09:25:18.807696Z",
    "updatedAt": "2025-10-25T22:53:34.807710Z"
  },
  {
    "name": "boAt Deuce USB 300 2 in 1 Type-C & Micro USB Stress Resistant, Tangle-Free, Sturdy Cable with 3A Fast Charging & 480mbps Data Transmission, 10000+ Bends Lifespan and Extended 1.5m Length(Martian Red)",
    "category": "Computers&Accessories|Accessories&Peripherals|Cables&Accessories|Cables|USBCable",
    "imageUrl": "https://m.media-amazon.com/images/I/41V5FtEWPkL._SX300_SY300_QL70_FMwebp_.jpg",
    "description": "The boAt Deuce USB 300 2 in 1 cable is compatible with smartphones, tablets, PC peripherals, Bluetooth speakers, power banks and all other devices with Type-C as well as Micro USB port|It ensures 3A fast charging and data transmissions with rapid sync at 480 mbps|The premium Nylon braided skin makes it sturdy and invincible against external damage|Its Aluminium alloy shell housing makes it last longer with 10000+ Bends Lifespan with extended frame protection for strain relief|The resilient and flexible design offers a tangle free experience seamlessly|Deuce USB 300 cable offers a perfect 1.5 meters in length for smooth & hassle-free user experience|2 years warranty from the date of purchase",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-05-09T06:03:41.807925Z",
    "updatedAt": "2025-10-12T16:14:32.807956Z"
  },
  {
    "name": "Portronics Konnect L 1.2M Fast Charging 3A 8 Pin USB Cable with Charge & Sync Function for iPhone, iPad (Grey)",
    "category": "Computers&Accessories|Accessories&Peripherals|Cables&Accessories|Cables|USBCable",
    "imageUrl": "https://m.media-amazon.com/images/W/WEBP_402378-T2/images/I/31VzNhhqifL._SX300_SY300_QL70_FMwebp_.jpg",
    "description": "[CHARGE & SYNC FUNCTION]- This cable comes with charging & Data sync function|[HIGH QUALITY MATERIAL]- TPE + Nylon Material to make sure that the life of the cable is enhanced significantly|[LONG CORD]- The Cable is extra thick 1.2 meter long, optimized for an easy use for your comfort at home or office|[MORE DURABLE]-This cable is unique interms of design and multi-use and is positioned to provide the best comfort and performance while using|[UNIVERSAL COMPATIBILITY]- Compatible with all devices like iPhone XS, X, XR, 8, 7, 6S, 6, 5S, iPad Pro, iPad mini and iPad Air",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-06-02T16:45:35.808206Z",
    "updatedAt": "2025-11-01T03:31:45.808246Z"
  },
  {
    "name": "pTron Solero TB301 3A Type-C Data and Fast Charging Cable, Made in India, 480Mbps Data Sync, Strong and Durable 1.5-Meter Nylon Braided USB Cable for Type-C Devices for Charging Adapter (Black)",
    "category": "Computers&Accessories|Accessories&Peripherals|Cables&Accessories|Cables|USBCable",
    "imageUrl": "https://m.media-amazon.com/images/I/31wOPjcSxlL._SX300_SY300_QL70_FMwebp_.jpg",
    "description": "Fast Charging & Data Sync: Solero TB301 Type-C cable supports fast charge up to 5V/3A for devices and data syncing speed up to 480Mbps.|Universal Compatibility: This USB charging cable connects USB Type-C devices with standard USB devices like laptops, hard drives, power banks, wall and car chargers, etc..Connector One: Reversible Type C|Connector Two: USB A Type|Rough & Tough Type-C Cable: Charging cable with a double-braided exterior, premium aramid fiber core and metal plugs. It has passed 10,000 bending tests and can easily withstand daily use.|Extended Length: 1.5-meter long c-type cable uses nylon material to protect the wire and avoid knots.|Perfect Fit Connectors: pTron Soler USB-C has passed the 5KG load test, swing test, 5000+ times connect & disconnect to ensure that there are no loose connections.",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-09-03T18:18:02.808430Z",
    "updatedAt": "2025-10-31T17:11:30.808444Z"
  },
  {
    "name": "boAt Micro USB 55 Tangle-free, Sturdy Micro USB Cable with 3A Fast Charging & 480mbps Data Transmission (Black)",
    "category": "Computers&Accessories|Accessories&Peripherals|Cables&Accessories|Cables|USBCable",
    "imageUrl": "https://m.media-amazon.com/images/W/WEBP_402378-T2/images/I/41jlwEZpa5L._SX300_SY300_QL70_FMwebp_.jpg",
    "description": "It Ensures High Speed Transmission And Charging By Offering 3A Fast Charging And Data Transmissions With Rapid Sync At 480 Mbps|The Braided Skin Makes It Durable And Invincible Against External Damage So You Can Have An Absolute Hassle-Free & Tangle Free Experience|Its Durable Pvc Housing And The Flexible Design Makes It Last 6 Times Longer Than Other Cables|Usb Cable Offers A Perfect 1.5 Meters In Length For Smooth & Hassle-Free User Experience For Superior Charging & Data Transfer Tasks|The Compact And Smooth Aluminium Connector Fits Most Cases Seamlessly And Resists Corrosion For Signal Purity|Micro Usb 55 Cable Offers Universal Compatibility As It Is Compatible With Most Android Smartphones, Tablets, Pc Peripherals, Bluetooth Speakers, Power Banks, Game Consoles & All Micro-Usb Enabled Devices|2 years warranty from the date of purchase",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-06-23T11:30:03.808577Z",
    "updatedAt": "2025-10-18T07:47:26.808604Z"
  },
  {
    "name": "MI Usb Type-C Cable Smartphone (Black)",
    "category": "Computers&Accessories|Accessories&Peripherals|Cables&Accessories|Cables|USBCable",
    "imageUrl": "https://m.media-amazon.com/images/I/31XO-wfGGGL._SX300_SY300_QL70_FMwebp_.jpg",
    "description": "1m long Type-C USB Cable|Sturdy and Durable. With USB cable you can transfer data with speeds of upto 480 Mbps|Upto 3A output|6months warranty|Sturdy and Durable. With USB cable you can transfer data with speeds of upto 480 Mbps|6months warranty|Up To 3A Output",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-08-13T06:04:18.808829Z",
    "updatedAt": "2025-10-19T10:28:28.808844Z"
  },
  {
    "name": "TP-Link USB WiFi Adapter for PC(TL-WN725N), N150 Wireless Network Adapter for Desktop - Nano Size WiFi Dongle Compatible with Windows 11/10/7/8/8.1/XP/ Mac OS 10.9-10.15 Linux Kernel 2.6.18-4.4.3",
    "category": "Computers&Accessories|NetworkingDevices|NetworkAdapters|WirelessUSBAdapters",
    "imageUrl": "https://m.media-amazon.com/images/W/WEBP_402378-T2/images/I/31e6ElWRymL._SX300_SY300_QL70_FMwebp_.jpg",
    "description": "USB WiFi Adapter \u2014\u2014 Speedy wireless transmission at up to 150Mbps ideal for video streaming or internet calls|Mini Design \u2014\u2014 Sleek miniature design so small that once plugged in, can be left in a Laptop\u2019s USB port|Advanced Security \u2014\u2014 Supports 64/128 WEP, WPA, PA2/WPA-PSK/WPA2-PSK(TKIP/AES)|Compatibility \u2014\u2014 Windows 11/10/8.1/8/7/XP, Mac OS 10.15 and earlier, Linux|Easy Setup \u2014\u2014 Connect in no time with easy setup utility in 14 languages|In an unlikely case of product quality related issue, we may ask you to reach out to brand\u2019s customer service support and seek resolution. We will require brand proof of issue to process replacement request",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-07-02T08:16:38.809149Z",
    "updatedAt": "2025-10-29T17:39:33.809172Z"
  },
  {
    "name": "Ambrane Unbreakable 60W / 3A Fast Charging 1.5m Braided Micro USB Cable for Smartphones, Tablets, Laptops & Other Micro USB Devices, 480Mbps Data Sync, Quick Charge 3.0 (RCM15, Black)",
    "category": "Computers&Accessories|Accessories&Peripherals|Cables&Accessories|Cables|USBCable",
    "imageUrl": "https://m.media-amazon.com/images/W/WEBP_402378-T2/images/I/31kj3q4SepL._SY445_SX342_QL70_FMwebp_.jpg",
    "description": "Universal Compatibility \u2013 It is compatible with all Micro USB enabled devices, be it an android smartphone, tablet, PC peripheral or any other micro USB compatible device|Unbreakable \u2013 Made of special braided outer with rugged interior bindings, it is ultra-durable cable that won\u2019t be affected by daily rough usage|Ideal Length \u2013 It has ideal length of 1.5 meters which is neither too short like your typical 1meter cable or too long like a 2meters cable|Supports maximum 3A fast charging and 480 Mbps data transfer speed|6 Months manufacturer warranty from the date of purchase.",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-07-09T00:39:03.809349Z",
    "updatedAt": "2025-10-11T20:39:13.809369Z"
  },
  {
    "name": "Portronics Konnect L POR-1081 Fast Charging 3A Type-C Cable 1.2Meter with Charge & Sync Function for All Type-C Devices (Grey)",
    "category": "Computers&Accessories|Accessories&Peripherals|Cables&Accessories|Cables|USBCable",
    "imageUrl": "https://m.media-amazon.com/images/I/31dJ+lXJq3L._SY300_SX300_.jpg",
    "description": "[CHARGE & SYNC FUNCTION]- This cable comes with charging & Data sync function for smartphones|[HIGH QUALITY MATERIAL]- TPE + Nylon Material to make sure that the life of the cable is enhanced significantly|[LONG CORD]- The Cable is extra thick 1.2 meter long, optimized for an easy use for your comfort at home or office|[MORE DURABLE]-This cable is unique interms of design and multi-use and is positioned to provide the best comfort and performance while using",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-07-24T13:26:19.809542Z",
    "updatedAt": "2025-10-08T04:23:40.809556Z"
  },
  {
    "name": "boAt Rugged v3 Extra Tough Unbreakable Braided Micro USB Cable 1.5 Meter (Black)",
    "category": "Computers&Accessories|Accessories&Peripherals|Cables&Accessories|Cables|USBCable",
    "imageUrl": "https://m.media-amazon.com/images/I/41SDfuK7L2L._SX300_SY300_QL70_FMwebp_.jpg",
    "description": "The boAt rugged cable features our special toughest polyethylene braided jacket and this unique jacket provides greater protection than anything else you have seen in its class. Round Cable|Extra tough polyethylene terephthalate cable skin ensures 10000 plus bend lifespan, stress and stretch resistance|The boAt rugged Micro USB cable is compatible with most android smartphones, windows phone, tablets, PC peripherals and other micro USB compatible devices|2.4A rapid charge, fast data transmission and rapid speed to sync your device at the speed up to 480mbps|boAt rugged micro USB cable offers a perfect 1.5 meters in length, optimized for an easy use for your comfort at home or office|2 years warranty from the date of purchase",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-07-02T02:47:52.809692Z",
    "updatedAt": "2025-10-11T20:05:53.809703Z"
  },
  {
    "name": "AmazonBasics Flexible Premium HDMI Cable (Black, 4K@60Hz, 18Gbps), 3-Foot",
    "category": "Electronics|HomeTheater,TV&Video|Accessories|Cables|HDMICables",
    "imageUrl": "https://m.media-amazon.com/images/I/41nPYaWA+ML._SY300_SX300_.jpg",
    "description": "Flexible, lightweight HDMI cable for connecting media devices to playback display such as HDTVs, projectors, and more|Compatible with Blu-Ray players, computers, Apple TV, Roku, cable, PS4, Xbox One, and other HDMI-compatible devices|Solid copper conductors and full metal jacket shielding for durability and high-performance connectivity|Supports Ethernet, 3D, 4K video and Audio Return Channel (ARC) and meets the latest HDMI standards|Supports bandwidth up to 18Gbps and is backwards compatible with earlier versions|Includes a 3 foot cable",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-06-29T04:11:09.809892Z",
    "updatedAt": "2025-10-18T19:43:15.809906Z"
  },
  {
    "name": "Portronics Konnect CL 20W POR-1067 Type-C to 8 Pin USB 1.2M Cable with Power Delivery & 3A Quick Charge Support, Nylon Braided for All Type-C and 8 Pin Devices, Green",
    "category": "Computers&Accessories|Accessories&Peripherals|Cables&Accessories|Cables|USBCable",
    "imageUrl": "https://m.media-amazon.com/images/I/31J6qGhAL9L._SX300_SY300_QL70_FMwebp_.jpg",
    "description": "[20W PD FAST CHARGING]-It\u2019s supports 20W PD quick charge protocol, charge up to 50% in around 30 minutes. It is ideal for charging your USB type c enabled devices at maximum speed|[USB-C to 8 Pin Cable]- It\u2019s offer rapid charging and syncing between USB Type-C and 8 Pin enabled devices. Safe charging at up to 3A is ensured by high-standard components|[MORE DURABLE]- This cable is unique interms of design and multi-use and is positioned to provide the best comfort and performance while using|[FLEXIBLE CORD]- The Cable uses nylon Braided + Metal Housing material to make sure that the life of the cable is enhanced significantly. It is 4mm extra thick slim 1.2meter long|[UNIVERSAL COMPATIBILITY]-Charge for all Type C USB connectivity devices including MacBook 12 inch, Nexus 5x, Nexus 6p, OnePlus 2, pixel c, Lumia 950, Lumia 950 xl, Nokia n1, etc",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-09-14T15:27:38.810078Z",
    "updatedAt": "2025-10-13T16:26:27.810093Z"
  },
  {
    "name": "Portronics Konnect L 1.2M POR-1401 Fast Charging 3A 8 Pin USB Cable with Charge & Sync Function (White)",
    "category": "Computers&Accessories|Accessories&Peripherals|Cables&Accessories|Cables|USBCable",
    "imageUrl": "https://m.media-amazon.com/images/W/WEBP_402378-T2/images/I/41R08zLK69L._SX300_SY300_QL70_FMwebp_.jpg",
    "description": "[CHARGE & SYNC FUNCTION]- This cable comes with charging & Data sync function|[HIGH QUALITY MATERIAL]- TPE + Nylon Material to make sure that the life of the cable is enhanced significantly|[LONG CORD]- The Cable is extra thick 1.2 meter long, optimized for an easy use for your comfort at home or office|[MORE DURABLE]-This cable is unique interms of design and multi-use and is positioned to provide the best comfort and performance while using|[UNIVERSAL COMPATIBILITY]- Compatible with all devices like iPhone XS, X, XR, 8, 7, 6S, 6, 5S, iPad Pro, iPad mini and iPad Air",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-08-12T12:36:08.810301Z",
    "updatedAt": "2025-10-20T20:11:47.810330Z"
  },
  {
    "name": "MI Braided USB Type-C Cable for Charging Adapter (Red)",
    "category": "Computers&Accessories|Accessories&Peripherals|Cables&Accessories|Cables|USBCable",
    "imageUrl": "https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/31gaP7qpBNL._SX300_SY300_QL70_FMwebp_.jpg",
    "description": "1M Long Cable. Usb 2.0 (Type A)|Toughened Joints|Strong And Sturdy|Country Of Origin: China|6 Months Warranty",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-07-11T06:02:42.810474Z",
    "updatedAt": "2025-10-12T00:37:16.810485Z"
  },
  {
    "name": "MI 80 cm (32 inches) 5A Series HD Ready Smart Android LED TV L32M7-5AIN (Black)",
    "category": "Electronics|HomeTheater,TV&Video|Televisions|SmartTelevisions",
    "imageUrl": "https://m.media-amazon.com/images/I/51fmHk3km+L._SX300_SY300_.jpg",
    "description": "Note : The brands, Mi and Xiaomi, are part of the same multinational conglomerate|Resolution : HD Ready (1366 x 768) Resolution | Refresh Rate : 60 Hertz | 178 Degree wide viewing angle|Connectivity: Dual Band Wi-Fi | 2 HDMI ports to connect latest gaming consoles, set top box, Blu-ray Players | 2 USB ports to connect hard drives and other USB devices | ALLM | ARC | Bluetooth 5.0 | Ethernet|Sound: 20 Watts Output | Dolby Audio, DTS Virtual: X, DTS-HD|Smart TV Features : Android TV 11 | PatchWall | IMDb Integration | Universal Search | 300+ Free Live Channels | Kids Mode with Parental lock | Smart Recommendations | Language Universe \u2013 15+ Languages | User Centre | Okay Google | Chromecast suporting Apps : Netflix, Prime Video, Disney+ Hotstar | 5000+ apps from Play Store |Quad core Cortex A35 | Chromecast built-in | Ok Google | Auto Low Latency Mode | 1GB RAM + 8GB Storage|Display: HD Ready | Vivid Picture Engine|Warranty Information: 1 year comprehensive warranty on product and 1 year ",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-07-30T18:38:49.810610Z",
    "updatedAt": "2025-10-29T09:17:33.810621Z"
  },
  {
    "name": "Ambrane Unbreakable 60W / 3A Fast Charging 1.5m Braided Type C to Type C Cable for Smartphones, Tablets, Laptops & Other Type C Devices, PD Technology, 480Mbps Data Sync (RCTT15, Black)",
    "category": "Computers&Accessories|Accessories&Peripherals|Cables&Accessories|Cables|USBCable",
    "imageUrl": "https://m.media-amazon.com/images/I/41d84o5-M-L._SY445_SX342_QL70_FMwebp_.jpg",
    "description": "Compatible with all Type C enabled devices, be it an android smartphone (Mi, Samsung, Oppo, Vivo, Realme, OnePlus, etc), tablet, laptop (Macbook, Chromebook, etc)|Unbreakable \u2013 Made of special braided outer with rugged interior bindings, it is ultra-durable cable that won\u2019t be affected by daily rough usage|Ideal Length \u2013 It has ideal length of 1.5 meters which is neither too short like your typical 1meter cable or too long like a 2meters cable|Supports maximum 3A fast charging and 480 Mbps data transfer speed|6 months manufacturer warranty from the date of purchase",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-10-08T00:22:09.810745Z",
    "updatedAt": "2025-10-08T07:44:16.810756Z"
  },
  {
    "name": "boAt Type C A325 Tangle-free, Sturdy Type C Cable with 3A Rapid Charging & 480mbps Data Transmission(Black)",
    "category": "Computers&Accessories|Accessories&Peripherals|Cables&Accessories|Cables|USBCable",
    "imageUrl": "https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/41xwPQLxTML._SX300_SY300_QL70_FMwebp_.jpg",
    "description": "Type C A 325 Cable Is Designed With A Perfect 1.5 Meters In Length For Hassle Free Usage|It Dons Premium Braided Skin That Makes It Sturdy And Invincible Against External Damage With 10000+ Bends Lifespan The Cable Stays Stronger And Lasts Longer|Type C A 325 Offers Universal Compatibility With Smartphones, Tablets, Pc Peripherals, Bluetooth Speakers, Power Banks And All Other Devices With Type C Port|The Reversible Metallic Aluminium Tip Lets The User Connect Devices In A Carefree Manner|Its Flexible Design Offers The User A Tangle-Free Experience|2 years warranty from the date of purchase",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-07-31T00:47:00.810889Z",
    "updatedAt": "2025-10-27T00:42:27.810916Z"
  },
  {
    "name": "LG 80 cm (32 inches) HD Ready Smart LED TV 32LM563BPTC (Dark Iron Gray)",
    "category": "Electronics|HomeTheater,TV&Video|Televisions|SmartTelevisions",
    "imageUrl": "https://m.media-amazon.com/images/W/WEBP_402378-T2/images/I/51v-2Nzr+ML._SY300_SX300_.jpg",
    "description": "Resolution: HD Ready (1366x768) | Refresh Rate: 50 hertz|Connectivity: 2 HDMI ports to connect set top box, Blu Ray players, gaming console | 1 USB ports to connect hard drives and other USB devices|Sound output: 10 Watts Output I 2 Speakers | DTS Virtual:X | Sound Type : Down Firing|Smart TV Features: Web OS Smart TV | Wi-Fi | Home Dashboard | Screen Mirroring | Mini TV Browser | Multi-Tasking | Office 365, Set WXHXD (with Stand ) mm - 739 x 472 x 168|Display: Active HDR | Display Type: Flat | BackLight Module: Slim LED|Warranty Information: 1 Year LG India Comprehensive Warranty and additional 1 year Warranty is applicable on panel/module from the date of purchase|Installation : For requesting installation/wall mounting/demo of this product once delivered, please directly call LG support (Please visit LG Website for Toll Free Numebrs) and provide product's model name as well as seller's details mentioned on the invoice",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-07-31T07:00:19.811122Z",
    "updatedAt": "2025-10-19T23:30:11.811141Z"
  },
  {
    "name": "Duracell USB Lightning Apple Certified (Mfi) Braided Sync & Charge Cable For Iphone, Ipad And Ipod. Fast Charging Lightning Cable, 3.9 Feet (1.2M) - Black",
    "category": "Computers&Accessories|Accessories&Peripherals|Cables&Accessories|Cables|USBCable",
    "imageUrl": "https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/41TZJiPRRwL._SX300_SY300_QL70_FMwebp_.jpg",
    "description": "Supports Ios Devices With Max Output Up To 2.4A|Up To 10, 000+ Bend And 10, 000+ Plugging And Unplugging Test Ensure This Cable A Longer Lifespan|Ensure Fast And Stable Data Transmission Up To 480 Mbps|2 Years Warranty|Compatible Designed To Work Flawlessly With Mfi Or Apple Devices, Iphone, Imac, Ipad Etc|1.2M Tangle Free Durable Tough Braiding Sync & Charge Cable",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-05-19T19:59:26.811354Z",
    "updatedAt": "2025-11-01T05:37:23.811375Z"
  },
  {
    "name": "tizum HDMI to VGA Adapter Cable 1080P for Projector, Computer, Laptop, TV, Projectors & TV",
    "category": "Electronics|HomeTheater,TV&Video|Accessories|Cables|HDMICables",
    "imageUrl": "https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/31MIyzg8uzL._SX300_SY300_QL70_FMwebp_.jpg",
    "description": "Superior Stability: Built-in advanced Certified AG6200 IC chip converts HDMI digital signal to VGA analog signal. It is NOT a bi-directional converter and cannot transmit signals from VGA to HDMI.|Compact Design: Tizum HDMI to VGA adapter is compact & lightweight which makes it easy to carry, travel friendly and also saves space on your desk helping it keep clutter free.|High Definition Image Quality: The HDMI male to VGA female converter supports resolution up to 1920x1080 60Hz (1080p Full HD) including 720p, 1600x1200, 1280x1024 for high definition monitors & projectors.|Wide Compatibility: The adapter is compatible with Computer, PC, Desktop, Laptop, Notebook, Chromebook, PS3, Xbox, Set Top Box, TV & other devices with HDMI port. Note: Does not Support Audio.|Incredible Performance: It resists corrosion & abrasion; improves signal transmission; & protects HDMI port of your device to ensure a longer lifespan",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-06-26T19:45:18.811533Z",
    "updatedAt": "2025-10-25T04:01:39.811556Z"
  },
  {
    "name": "Samsung 80 cm (32 Inches) Wondertainment Series HD Ready LED Smart TV UA32T4340BKXXL (Glossy Black)",
    "category": "Electronics|HomeTheater,TV&Video|Televisions|SmartTelevisions",
    "imageUrl": "https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/51q3+E64azL._SX300_SY300_.jpg",
    "description": "Resolution: HD Ready (1366x768) | Refresh Rate: 60 hertz|Connectivity: 2 HDMI ports to connect set top box, Blu Ray players, gaming console | 1 USB ports to connect hard drives and other USB devices|Sound : 20 Watts Output | Dolby Digital Plus|Smart TV Features : Personal Computer | Screen Share | Music System | Content Guide | Connect Share Movie|Display : LED Panel | Mega Contrast | PurColor | HD Picture Quality | Slim & Stylish Design|Warranty Information: 1 year comprehensive warranty plus additional 1 years on panel by brand from date of invoice|Installation: TV Table stand is not included in the box with this model. customer may ask for Table Top Stand or Wall Mount which will be provided to the customer at the time of installation, please directly call Samsung support on [1800407267864 / 180057267864] and provide product's model name as well as seller's details mentioned on the invoice|Easy Returns: This product is eligible for replacement within 10 days of delivery in case of a",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-09-15T23:20:28.811678Z",
    "updatedAt": "2025-10-06T03:06:33.811689Z"
  },
  {
    "name": "Flix Micro Usb Cable For Smartphone (Black)",
    "category": "Computers&Accessories|Accessories&Peripherals|Cables&Accessories|Cables|USBCable",
    "imageUrl": "https://m.media-amazon.com/images/I/31qGpf8uzuL._SY445_SX342_QL70_FMwebp_.jpg",
    "description": "Micro usb cable is 1 meter in length, optimized for easy use for your comfort at home or office, helps you to overcome distance restrictions|Durable pvc outer exterior: Pvc cables are versatile, high in tensile strength, flexible, and good conductors|Charge & sync, this usb cable can charge and data sync simultaneously at 480mbps speed, compatible with all devices with a micro usb port. Core : Tinned copper|Micro usb charging cable for android phones and any other device with micro usb port|Contact us on 1800-102-2700 or write us on support@flixaccessories.com",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-05-24T09:50:58.811810Z",
    "updatedAt": "2025-10-08T20:40:38.811820Z"
  },
  {
    "name": "Acer 80 cm (32 inches) I Series HD Ready Android Smart LED TV AR32AR2841HDFL (Black)",
    "category": "Electronics|HomeTheater,TV&Video|Televisions|SmartTelevisions",
    "imageUrl": "https://m.media-amazon.com/images/I/41gikeSuhAL._SY300_SX300_QL70_FMwebp_.jpg",
    "description": "Resolution : HD Ready (1366x768) | Refresh Rate : 60 Hertz | 178 Degree wide viewing angle|Connectivity: Dual band Wifi | 2 way Bluetooth | HDMI ports 2.0 x 2 (HDMI 1 supports ARC) to connect personal computer, laptop, set top box, Blu-ray speakers or a gaming console | USB ports 2.0 x 2 to connect hard drives or other USB device|Sound: 24 Watts Output | High Fidelity Speakers with Dolby Audio | 5 Sound Modes - Movie, Music, Standard, News, Sports|Smart Tv Features: Google certified Android TV 11 | Google Assistant | Chromecast built-in | Voice controlled Smart Remote | Hotkeys for Quick Access - Netflix, Prime Video, YouTube, Disney+Hotstar | 5 Picture Mode | 1.5GB RAM | 8GB Storage | 64bit Quad Core Processor|Display : 16.7 Million Colours | Wide Colour Gamut | Intelligent Frame Stabilization Engine | HDR10+ | Super Brightness | Micro Dimming | Blue Light Reduction|Warranty Information: 1 year comprehensive warranty provided by the manufacturer from date of purchase|Installation: Ins",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-07-07T00:06:46.812003Z",
    "updatedAt": "2025-10-13T01:05:40.812016Z"
  },
  {
    "name": "Tizum High Speed HDMI Cable with Ethernet | Supports 3D 4K | for All HDMI Devices Laptop Computer Gaming Console TV Set Top Box (1.5 Meter/ 5 Feet)",
    "category": "Electronics|HomeTheater,TV&Video|Accessories|Cables|HDMICables",
    "imageUrl": "https://m.media-amazon.com/images/I/41da4tk7N+L._SY300_SX300_.jpg",
    "description": "Latest Standard HDMI A Male to A Male Cable: Supports Ethernet, 3D, 4K video and Audio Return Channel (ARC)|Connects Blu-ray players, Fire TV, Apple TV, PS4, PS3, Xbox One, Xbox 360, Computers, DVD Players, Set Top Box, Dish TV Box, and other HDMI-enabLED devices to TVs, displays, A/V receivers and more.Suitable For Mp3, Gaming Device, Mobile, Tablet, Laptop|Cable allows you to share an Internet connection among multiple devices without the need for a separate Ethernet cable|Meets HDMI 1.4 Standards (4K Video at 24 Hz, 2160p, 48 bit/px color depth) that supports bandwidth up to 10.2Gbps and backwards compatible with earlier versions|\u2714 Gold Plate HDMI Cable of Length: 5 Feet/ 1.8 Meters",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-07-23T14:21:33.812145Z",
    "updatedAt": "2025-10-11T20:25:52.812159Z"
  },
  {
    "name": "OnePlus 80 cm (32 inches) Y Series HD Ready LED Smart Android TV 32Y1 (Black)",
    "category": "Electronics|HomeTheater,TV&Video|Televisions|SmartTelevisions",
    "imageUrl": "https://m.media-amazon.com/images/W/WEBP_402378-T2/images/I/41WE9ZGEC4L._SX300_SY300_QL70_FMwebp_.jpg",
    "description": "Resolution: HD Ready (1366x768) | Refresh Rate: 60 hertz|Connectivity: 2 HDMI ports to connect set top box, Blu Ray players, gaming console | 2 USB ports to connect hard drives and other USB devices, Dimensions(TV With Stand) - 71.3cm*20cm*46.9cm, VESA Hole Pitch - 20cm*20cm|Sound : 20 Watts Output | Dolby Audio|Smart TV Features: Android TV 9.0 | OnePlus Connect | Google Assistant | Play Store | Chromecast | Shared Album | Supported Apps : Netflix, YouTube, Prime video | Content Calendar | OxygenPlay|Display : LED Panel | Noise Reduction | Colour Space Mapping |Dynamic Contrast | Anti-Aliasing | DCI-P3 93% colour gamut | Gamma Engine|Warranty Information: 1 year comprehensive warranty and additional 1 year on panel provided by the manufacturer from date of purchase|Installation/Wall mounting/demo will be arranged by Amazon Home Services. For any other information, please contact Amazon customer support | Wall Mount is not included in the box and will be charged extra at the time of in",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-05-27T06:53:20.812346Z",
    "updatedAt": "2025-10-06T04:14:37.812360Z"
  },
  {
    "name": "Ambrane Unbreakable 3 in 1 Fast Charging Braided Multipurpose Cable for Speaker with 2.1 A Speed - 1.25 meter, Black",
    "category": "Computers&Accessories|Accessories&Peripherals|Cables&Accessories|Cables|USBCable",
    "imageUrl": "https://m.media-amazon.com/images/W/WEBP_402378-T2/images/I/41GeM83DzzL._SX300_SY300_QL70_FMwebp_.jpg",
    "description": "Blazing Charging - All combined 3 in 1 cable supports fast charging with the speed 2.1A to all your gadgets including mobiles, tablets, speakers and much more.|Ultra Durable - The cable is crafted with braided wire giving you an extra tough braided cable with 10000+ bends lifespan cycle.|Universal Compatibility - The 3 in 1 cable gives you universal compatibility with its flexible and high-quality material that comes with a USB type C connector, micro USB connector and lightning connector.|Convenient Length - The durable and flexible cable comes with an ideal length of 1.25 meter which eliminates the struggle of finding nearby switch boards.|180 days manufacturer warranty from the date of purchase.",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-06-28T13:43:59.812549Z",
    "updatedAt": "2025-10-07T13:59:56.812564Z"
  },
  {
    "name": "Duracell USB C To Lightning Apple Certified (Mfi) Braided Sync & Charge Cable For Iphone, Ipad And Ipod. Fast Charging Lightning Cable, 3.9 Feet (1.2M) - Black",
    "category": "Computers&Accessories|Accessories&Peripherals|Cables&Accessories|Cables|USBCable",
    "imageUrl": "https://m.media-amazon.com/images/W/WEBP_402378-T2/images/I/4177nw8okbL._SX300_SY300_QL70_FMwebp_.jpg",
    "description": "1.2M Tangle Free durable tough braiding sync & charge cable|Supports iOS devices with max output up to 2.4A|Ensure fast and stable data transmission up to 480 Mbps|Up to 10,000+ bend and 10,000+ plugging and unplugging test ensure this cable a longer lifespan|Compatible designed to work flawlessly with MFi or apple devices, iPhone, iMac, iPad etc.|2 Years Warranty",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-10-25T08:56:41.812701Z",
    "updatedAt": "2025-10-26T02:25:42.812723Z"
  },
  {
    "name": "boAt A400 USB Type-C to USB-A 2.0 Male Data Cable, 2 Meter (Black)",
    "category": "Computers&Accessories|Accessories&Peripherals|Cables&Accessories|Cables|USBCable",
    "imageUrl": "https://m.media-amazon.com/images/I/41jk4zYjTsL._SX300_SY300_QL70_FMwebp_.jpg",
    "description": "2 meter special reversible Type-C to USB A male user-friendly design helps you insert the connector in a right way all the time|Data sync and charge for apple new MacBook 12 inch, nexus 5x, nexus 6p, OnePlus 2, pixel c, Lumia 950, Lumia 950 xl, Nokia n1, Chromebook google pixel, Asus zenphone3 and other USB-c devices|Support the maximum 3A fast charging and the speed of data sync up to 480 mbps|Aesthetically designed, aluminium ends, with high-density boAt's premium nylon braiding wrapped around the entire length of the tangle free cable for reinforcement and added durability|One end normal USB type a and other end USB type c",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-10-22T07:24:29.812842Z",
    "updatedAt": "2025-10-08T13:06:17.812853Z"
  },
  {
    "name": "AmazonBasics USB 2.0 - A-Male to A-Female Extension Cable for Personal Computer, Printer (Black, 9.8 Feet/3 Meters)",
    "category": "Computers&Accessories|Accessories&Peripherals|Cables&Accessories|Cables|USBCable",
    "imageUrl": "https://m.media-amazon.com/images/W/WEBP_402378-T2/images/I/41Fqm0bR7PL._SX300_SY300_QL70_FMwebp_.jpg",
    "description": "One 9.8-foot-long (3 meters) USB 2.0 A-Male to A-Female high-speed extension cable|Extends your USB connection to your computer by 9.8 feet; for use with printers, cameras, mice, keyboards and other USB computer peripherals|Constructed with corrosion-resistant, gold-plated connectors for optimal signal clarity and shielding to minimize interference|Features shielding that provides protection against noise from electromagnetic and radio-frequency signals, keeping your signal clear with less loss of bandwidth for higher performance|Typically, the Male A connector plugs into your computer and the Female A connects to the cable you need extended|1 year limited warranty",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-09-01T04:53:07.812976Z",
    "updatedAt": "2025-10-13T04:06:39.812987Z"
  },
  {
    "name": "Ambrane 60W / 3A Type C Fast Charging Unbreakable 1.5m L Shaped Braided Cable, PD Technology, 480Mbps Data Transfer for Smartphones, Tablet, Laptops & other type c devices (ABLC10, Black)",
    "category": "Computers&Accessories|Accessories&Peripherals|Cables&Accessories|Cables|USBCable",
    "imageUrl": "https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/41cCZ5EPnvL._SX300_SY300_QL70_FMwebp_.jpg",
    "description": "Stay ahead and never miss out with a 3A and 30W fast charging for your devices.|It supports Quick Charge 2.0/ 3.0 technology to keep your devices boosted up.|Its L-shape provides durability and comfort while you charge your favourite gadgets.|It comes with upto 60W flash charge support to make you always stay ahead.|Crafted for convenience, it allows you to charge and sync data with just one cable.",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-08-05T04:55:41.813106Z",
    "updatedAt": "2025-10-20T00:19:48.813117Z"
  },
  {
    "name": "Zoul USB C 60W Fast Charging 3A 6ft/2M Long Type C Nylon Braided Data Cable Quick Charger Cable QC 3.0 for Samsung Galaxy M31S M30 S10 S9 S20 Plus, Note 10 9 8, A20e A40 A50 A70 (2M, Grey)",
    "category": "Computers&Accessories|Accessories&Peripherals|Cables&Accessories|Cables|USBCable",
    "imageUrl": "https://m.media-amazon.com/images/I/419QKVTxaSL._SX300_SY300_QL70_FMwebp_.jpg",
    "description": "{3A/QC 3.0 FAST CHARGING and DATA SYNC} : This USB C cable supports QC 3.0 Fast Charging and Data Syncing, max current 3.0A and transfer speed up to 480Mbps. Built-in 56K pull-up resistor and strong metal connections provides reliable conductivity and stability.|{Nylon Braided Tangle-free Design} : Premium Nylon Braided Type C Cable/Lead adds additional durability and tangle free with a tested lifespan of 10000+ bending test.|{SAFE & RELIABLE} : High-purity copper wire features anti-oxidation and anti-rust, which will keep long-lasting fast charging performance. This Type c cable fast charging has safety certification, you have no need to worry about this cable quality at all.|{What You Get} : Premium Nylon Braided Cable 6FT(2M) and our friendly customer service.",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-10-16T03:57:14.813233Z",
    "updatedAt": "2025-10-06T20:32:25.813244Z"
  },
  {
    "name": "Samsung Original Type C to C Cable - 3.28 Feet (1 Meter), White",
    "category": "Computers&Accessories|Accessories&Peripherals|Cables&Accessories|Cables|USBCable",
    "imageUrl": "https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/11ICusapw3L._SY300_SX300_QL70_FMwebp_.jpg",
    "description": "USB Type-C to Type-C cable with universal compatibility|1m Length & Reversible design|High Speed Data/Charging with USB 2.0",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-07-06T22:22:39.813405Z",
    "updatedAt": "2025-10-19T11:32:51.813419Z"
  },
  {
    "name": "pTron Solero T351 3.5Amps Fast Charging Type-C to Type-C PD Data & Charging USB Cable, Made in India, 480Mbps Data Sync, Durable 1 Meter Long Cable for Type-C Smartphones, Tablets & Laptops (Black)",
    "category": "Computers&Accessories|Accessories&Peripherals|Cables&Accessories|Cables|USBCable",
    "imageUrl": "https://m.media-amazon.com/images/I/41wN7jooz0L._SX300_SY300_QL70_FMwebp_.jpg",
    "description": "Universal Compatibility: Solero T351 USB charging cable connects USB Type-C devices with USB Type-C devices like laptops, hard drives, power banks, wall chargers, car chargers, etc.|Ultimate Speed Charging: The built-in superconductivity copper wires enable a secure and real 3.5Amps output to charge your device at a super-fast charging speed.|Fast Data Sync: Comply with USB 2.0 Type C standard, this USB 2.0 C to C cable support data transfer speeds up to 480Mbps, which allows you to transfer 100 songs every 5 seconds.|Ultra Durability: Connectors with molded strain relief enable this Type-C cable to resist 10,000+ plug and unplug tests. Premium PVC cable exterior enables it to withstand 10,000+ bending tests.|1 Meter Long: Engineered & tested for compatibility with all USB-C devices, ensuring safe charging. Its flexible design offers users a tangle-free experience. 6 months warranty from the manufacturer.",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-10-18T12:42:11.813575Z",
    "updatedAt": "2025-10-31T06:36:38.813595Z"
  },
  {
    "name": "pTron Solero MB301 3A Micro USB Data & Charging Cable, Made in India, 480Mbps Data Sync, Strong & Durable 1.5-Meter Nylon Braided USB Cable for Micro USB Devices - (Black)",
    "category": "Computers&Accessories|Accessories&Peripherals|Cables&Accessories|Cables|USBCable",
    "imageUrl": "https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/31ew3okQR2L._SX300_SY300_QL70_FMwebp_.jpg",
    "description": "Fast Charging & Data Sync: Solero MB301 micro USB cable supports fast charge up to 5V/3A for devices and data syncing speed up to 480Mbps.|Universal Compatibility: This USB charging cable connects micro USB port devices with standard USB port devices like laptops, hard drives, power banks, wall and car chargers, etc.|Rough & Tough USB Cable: Charging cable with a double-braided exterior, premium aramid fiber core and metal plugs. It has passed 10,000 bending tests and can easily withstand daily use.|Extended Length: 1.5-meter long micro USB data and charging cable use nylon material to protect the wire and avoid knots.|Perfect Fit Connectors: pTron Soler MB301 has passed the 5KG load test, swing test, 5000+ times connect & disconnect to ensure that there are no loose connections.",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-09-16T09:05:12.813738Z",
    "updatedAt": "2025-10-23T06:06:22.813750Z"
  },
  {
    "name": "Amazonbasics Nylon Braided Usb-C To Lightning Cable, Fast Charging Mfi Certified Smartphone, Iphone Charger (6-Foot, Dark Grey)",
    "category": "Computers&Accessories|Accessories&Peripherals|Cables&Accessories|Cables|USBCable",
    "imageUrl": "https://m.media-amazon.com/images/I/3183iGEWksL._SX300_SY300_QL70_FMwebp_.jpg",
    "description": "Fast Charge: When Used With An 18W Or Higher Usb-C Wall Charger With Power Delivery You Can Charge Your Iphone To 50% Battery In Just 30 Minutes - Supported Models Include Iphone 8, 8 Plus, X, Xs, Xr, Xs Max, 11, 11 Pro, 11 Pro Max, Ipads, And More. High-Speed Data Transfer: Up To 480 Mbps For Transferring Music, Movies, And More In Seconds|Durable Friendly Design: Built With Top Rated Materials And Tested To Withstand Up To X Bend Cycles And Features Textured Grooves On Connector Ends For Improved Grip|Certified Chip: Apple Mfi Certified Charging And Syncing Cable For Your Apple Devices With Improved Chipset To Ensure Full Compatibility|This Cable Is Not Compatible With Standard Usb Chargers / Laptop Ports. Works Only With Type C Adapters And Laptop Ports. Please Check The Port Of Your Adapter Before Buying The Cable.|Connector Type: Usb Type C",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-08-10T10:54:01.813909Z",
    "updatedAt": "2025-10-09T02:07:45.813922Z"
  },
  {
    "name": "Sounce 65W OnePlus Dash Warp Charge Cable, 6.5A Type-C to USB C PD Data Sync Fast Charging Cable Compatible with One Plus 8T/ 9/ 9R/ 9 pro/ 9RT/ 10R/ Nord & for All Type C Devices \u2013 Red, 1 Meter",
    "category": "Computers&Accessories|Accessories&Peripherals|Cables&Accessories|Cables|USBCable",
    "imageUrl": "https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/41P2EdQI1ZL._SY445_SX342_QL70_FMwebp_.jpg",
    "description": "[USB C To USB C Cord 1M] With This 1 Meter USB C Fast Charger Cable, You Can Enjoy Convenient Charging for Your USB C Laptops, Tablets, And Smartphones. Perfect For Used on Sofas, Beds, In the Car, And Other Places.|[6.5 Amp USB C Cable High-Speed Data and Charging] Our Type C To Type C Cable Perfect Match with All 60W 45W 30W 18W 15W USB-C Power Adapters, Support Pd 3.0 And Qc 3.0 Fast Charge for Your Devices. Data Transfer Speed Is Up To 480Mbps Of USB 2.0. Note: Not Support Video Transfer.|[USB C To USB C Fast Charging Cable 6Ft] This Newest USB C To C Cable Support Warp Charge For One plus 8T, One plus 9/9 Pro, Too Fast Charge For MacBook Air 13 Inch 2020/2019/2018, For MacBook Pro 13/15/16 Inch 2020/2019/2018/2017/2016, For iPad Mini 2021, For iPad Pro 12.9/11 Inch 2020, For Google Pixel 6/6 Pro/5/4A/4 Xl/4/3A Xl/3A/3 Xl/3/2 Xl/2, For Samsung Galaxy S21 Fe 5G/S20 Fe 5G/Note 20 Ultra/Note 20/S20/S20+/S20 Ultra, Galaxy Z Flip 3, Galaxy Z Fold 3, And More Devices.|[One plus 8T Warp C",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-06-26T10:43:23.814050Z",
    "updatedAt": "2025-11-02T19:21:56.814062Z"
  },
  {
    "name": "OnePlus 126 cm (50 inches) Y Series 4K Ultra HD Smart Android LED TV 50Y1S Pro (Black)",
    "category": "Electronics|HomeTheater,TV&Video|Televisions|SmartTelevisions",
    "imageUrl": "https://m.media-amazon.com/images/I/51hQfTroMzL._SX300_SY300_QL70_FMwebp_.jpg",
    "description": "Resolution: 4K Ultra HD (3840x2160) | Bezel-less Design|Connectivity: Dual-band Wi-Fi | 3HDMI ports to connect set top box, Blu Ray players, gaming console | 2 USB ports to connect hard drives and other USB devices|Sound : 24 Watts Output | Dolby Audio | Dolby Atmos Decoding|Smart TV features: Android TV | OnePlus Connect Ecosystem| Google Assistant | Chromecast, Miracast, DLNA | Auto Low Latency Mode | Supported Apps : Netflix, Youtube, Prime Video, Hotstar, SonyLiv, Hungama, JioCinema, Zee5, Eros Now, Oxygen Play|Display: 1 billion colors | Gamma Engine with MEMC | Decoding of HDR10+, HDR10, HLG|Warranty Information: 1 year comprehensive warranty and additional 1 year on panel provided by the manufacturer from date of purchase|Installation/Wall mounting/demo will be arranged by Amazon Home Services. For any other information, please contact Amazon customer support | Wall Mount is not included in the box and will be charged extra at the time of installation",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-10-11T14:39:23.814185Z",
    "updatedAt": "2025-10-12T00:42:23.814195Z"
  },
  {
    "name": "Duracell Type C To Type C 5A (100W) Braided Sync & Fast Charging Cable, 3.9 Feet (1.2M). USB C to C Cable, Supports PD & QC 3.0 Charging, 5 GBPS Data Transmission \u2013 Black",
    "category": "Computers&Accessories|Accessories&Peripherals|Cables&Accessories|Cables|USBCable",
    "imageUrl": "https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/41v5BQZzfAL._SX300_SY300_QL70_FMwebp_.jpg",
    "description": "Up To 10,000+ Bend And 10,000+ Plugging And Unplugging Test Ensure This Cable A Longer Lifespan|Ensure Fast And Stable Data Transmission Up To 5 Gbps|Compatible Designed To Work Flawlessly With All Usb-C Devices|2 Years Warranty|1.2M Tangle Free Durable Tough Braiding Sync & Charge Cable",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-09-25T01:02:38.814314Z",
    "updatedAt": "2025-10-09T07:26:06.814324Z"
  },
  {
    "name": "AmazonBasics USB 2.0 Cable - A-Male to B-Male - for Personal Computer, Printer- 6 Feet (1.8 Meters), Black",
    "category": "Computers&Accessories|Accessories&Peripherals|Cables&Accessories|Cables|USBCable",
    "imageUrl": "https://m.media-amazon.com/images/I/4101vlzySzL._SY300_SX300_QL70_FMwebp_.jpg",
    "description": "One 6-foot-long (1.8 meters) high-speed multi-shielded USB 2.0 A-Male to B-Male cable|Connects mice, keyboards and speed-critical devices, such as external hard drives, printers and cameras to your computer|Constructed with corrosion-resistant, gold-plated connectors for optimal signal clarity and shielding to minimize interference|Full 2.0 USB capability/480 Mbps transfer speed|1 year limited warranty",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-06-03T06:22:07.814486Z",
    "updatedAt": "2025-10-12T13:19:09.814507Z"
  },
  {
    "name": "Mi 108 cm (43 inches) Full HD Android LED TV 4C | L43M6-INC (Black)",
    "category": "Electronics|HomeTheater,TV&Video|Televisions|SmartTelevisions",
    "imageUrl": "https://m.media-amazon.com/images/I/41nsy8kxWUL._SY300_SX300_QL70_FMwebp_.jpg",
    "description": "Resolution : Full HD (1920x1080) | Refresh Rate : 60 Hertz | 178 Degree wide viewing angle|Connectivity: 3 HDMI ports to connect set top box, Blu-Ray players, gaming console | 3 USB ports to connect hard drives and other USB devices | 3.5mm to connect your headphones | S/PDIF port to connect Speakers|Sound: 20 Watts Powerful Stereo Speakers | DTS-HD|Smart TV Features : Android TV 9 | Chromecast built-in | PatchWall 4 with IMDb integration | 75+ Free Live Channels | Universal search | Language Universe (16+ Languages) | Miracast | Supported Apps: Prime Video | Netflix, Disney + Hotstar, YouTube, Apple TV, 5000+ apps from Play Store | Quad core processor | Built-in Wi-Fi | 1GB RAM + 8GB Storage|Display: LED Panel | Vivid Picture engine | Detailed Picture Controls | Ultra bright screen | Dynamic contrast | Dynamic backlight|Warranty Information: 1 year comprehensive warranty on product and 1 year additional on Panel provided by the brand from the date of purchase|Installation/Wall mountin",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-05-22T15:05:54.814668Z",
    "updatedAt": "2025-10-27T09:32:01.814686Z"
  },
  {
    "name": "Wayona Nylon Braided 3A Lightning to USB A Syncing and Fast Charging Data Cable for iPhone, Ipad (3 FT Pack of 1, Black)",
    "category": "Computers&Accessories|Accessories&Peripherals|Cables&Accessories|Cables|USBCable",
    "imageUrl": "https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/41rB0DnVFmL._SX300_SY300_QL70_FMwebp_.jpg",
    "description": "[High Compatibility] : iPhone X/XsMax/Xr ,iPhone 8/8 Plus,iPhone 7/7 Plus,iPhone 6s/6s Plus,iPhone 6/6 Plus,iPhone 5/5s/5c/se,iPad Pro,iPad Air 1/2,iPad mini 1/2/3,iPod nano7,iPod touch and more apple devices.|[Fast Charge&Data Sync ] : It can charge and sync simultaneously at a rapid speed, Compatible with any charging adaptor, multi-port charging station or power bank.|[Durability] : Durable nylon braided design with premium aluminum housing and toughened nylon fiber wound tightly around the cord lending it superior durability and adding a bit to its flexibility.|[High Security Level ] : It is designed to fully protect your device from damaging excessive current.Copper core thick+Multilayer shielding, Anti-interference, Protective circuit equipment.",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-09-27T05:14:54.814837Z",
    "updatedAt": "2025-10-29T03:42:22.814849Z"
  },
  {
    "name": "TP-Link Nano AC600 USB Wi-Fi Adapter(Archer T2U Nano)- 2.4G/5G Dual Band Wireless Network Adapter for PC Desktop Laptop, Mini Travel Size, Supports Windows 11,10, 8.1, 8, 7, XP/Mac OS 10.9-10.15",
    "category": "Computers&Accessories|NetworkingDevices|NetworkAdapters|WirelessUSBAdapters",
    "imageUrl": "https://m.media-amazon.com/images/W/WEBP_402378-T2/images/I/31EHCPHbSlL._SX300_SY300_QL70_FMwebp_.jpg",
    "description": "High Speed WiFi \u2014\u2014 Up to 600Mbps speeds with 200Mbps on 2.4GHz and 433 Mbps on 5GHz, upgrades your devices to higher AC WiFi speeds|Dual Band Wireless \u2014\u2014 2.4GHz and 5GHz band for flexible connectivity, upgrades your devices to work with the latest dual-band WiFi router for faster speed and extended range|Nano design \u2014\u2014 Small, unobtrusive design allows you to plug it in and forget it is even there|Operating System \u2014\u2014 Supports Windows 11/10/8.1/8/7/XP, Mac OS 10.15 and earlier|Advanced Security \u2014\u2014 Supports 64/128-bit WEP, WPA/WPA2, and WPA-PSK/WPA2-PSK encryption standards|Worry-free customer support \u2014\u2014 For other installation related query, compatibility issue or any other queries call on toll free no",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-05-29T06:46:35.814972Z",
    "updatedAt": "2025-10-11T18:28:34.814983Z"
  },
  {
    "name": "FLiX (Beetel USB to Micro USB PVC Data Sync & 2A Fast Charging Cable, Made in India, 480Mbps Data Sync, Solid Cable, 1 Meter Long USB Cable for Micro USB Devices (White)(XCD-M11)",
    "category": "Computers&Accessories|Accessories&Peripherals|Cables&Accessories|Cables|USBCable",
    "imageUrl": "https://m.media-amazon.com/images/I/31v7NnnAItL._SY445_SX342_QL70_FMwebp_.jpg",
    "description": "Micro USB charging cable for android phones and any other device with Micro USB Port|Charge & sync, this USB cable can charge and data sync simultaneously at 480Mbps speed, compatible with all devices with a Micro USB port. Core : Tinned Copper|Durable PVC Outer Exterior: PVC cables are versatile, high in tensile strength, flexible, and good conductors.|micro USB cable is 1 meter in length, optimized for easy use for your comfort at home or office, helps you to overcome distance restrictions.",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-06-08T17:40:32.815106Z",
    "updatedAt": "2025-10-07T22:14:22.815116Z"
  },
  {
    "name": "Wecool Nylon Braided Multifunction Fast Charging Cable For Android Smartphone, Ios And Type C Usb Devices, 3 In 1 Charging Cable, 3A, (3 Feet) (Black)",
    "category": "Computers&Accessories|Accessories&Peripherals|Cables&Accessories|Cables|USBCable",
    "imageUrl": "https://m.media-amazon.com/images/W/WEBP_402378-T2/images/I/41CnR1WhD3L._SX300_SY300_QL70_FMwebp_.jpg",
    "description": "Special Features Of The Universal Cable: This Cable Is Touch And Sleek, Highly Durable, Premium Nylon Braided Cable, Has 1 Year Warranty.|Ultra Durable Usb Cable: This Universal Cable Is Made Of High-Quality Nylon Material And Makes It Resistant To Fraying And Wear-Related Damage, More Flexible And Durable|Fast Charging Cable: This Universal Cable Can Simultaneously Charge Android, Ios And Type C Devices. All Combined 3 In 1 Power Cord. All In One Charger|Usb Cable For Fast Charging: This Charging Cable Is Designed For Charging The Devices Quickly. The 3A Charger Is Universally Suitable For Charging All Smartphones|Country Of Origin: China|Multifunctional Usb Cable: Wecool 3 In 1 Charging Cable Is Tangle Free, Rugged, Quick Charging, Universally Compatible, Flexible And Of",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-05-08T01:54:21.815237Z",
    "updatedAt": "2025-10-26T00:01:42.815247Z"
  },
  {
    "name": "D-Link DWA-131 300 Mbps Wireless Nano USB Adapter (Black)",
    "category": "Computers&Accessories|NetworkingDevices|NetworkAdapters|WirelessUSBAdapters",
    "imageUrl": "https://m.media-amazon.com/images/I/31+NwZ8gb1L._SX300_SY300_.jpg",
    "description": "Connects your computer to a high-speed wireless network|Supports WPA/WPA2 wireless encryption to help prevent outside intrusion and protect your personal information from being exposed.|3 Year Brand Warranty|2.4Ghz frequency band (300mbps)|2 fixed internal Wi-Fi antenna|N300 MIMO Wi-Fi USB Adapter|This is a plug and play device with generic configuration|Compatible with all CCTV DVRs",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-09-07T08:37:10.815365Z",
    "updatedAt": "2025-11-01T15:54:40.815384Z"
  },
  {
    "name": "Amazon Basics High-Speed HDMI Cable, 6 Feet - Supports Ethernet, 3D, 4K video,Black",
    "category": "Electronics|HomeTheater,TV&Video|Accessories|Cables|HDMICables",
    "imageUrl": "https://m.media-amazon.com/images/I/41bCxnHksnL._SY300_SX300_QL70_FMwebp_.jpg",
    "description": "Please select appropriate display resolution & refresh rate for proper display output. HDMI A Male to A Male Cable: Supports Ethernet, 3D, 4K video and Audio Return Channel (ARC)|Connects Blu-ray players, Fire TV, Apple TV, PS4, PS3, XBox one, Xbox 360, computers and other HDMI-enabled devices to TVs, displays, A/V receivers and more|Cable allows you to share an Internet connection among multiple devices without the need for a separate Ethernet cable|Meets HDMI 2.0 standards (4K Video at 60 Hz, 2160p, 48 bit/px color depth) that supports bandwidth up to 18Gbps and backwards compatible with earlier versions|Cable Length: 6 feet (1.8 meters); 1 year limited warranty",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-08-05T23:25:01.815503Z",
    "updatedAt": "2025-10-31T19:46:31.815513Z"
  },
  {
    "name": "7SEVEN\u00ae Compatible for Samsung Smart 4K Ultra HD TV Monitor Remote Control Replacement of Original Samsung TV Remote for LED OLED UHD QLED and Suitable for 6 7 8 Series Samsung TV with Hot Keys BN59-01259E",
    "category": "Electronics|HomeTheater,TV&Video|Accessories|RemoteControls",
    "imageUrl": "https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/21rBnbHkW9L._SX300_SY300_QL70_FMwebp_.jpg",
    "description": "1. 7SEVEN Compatible remote suitable for all Original samasung TV / Monitor remote and have speciality with Hotkeys feature. It comes with NETFLIX, prime Video and ZEE5(www) Hotkeys. Incase ZEE5 app not available in your samsung smart tv then it will open default www(web broswer).|2. Equipped with various buttons and controls, this remote lets you adjust settings of your LED OLED QLED Curved & Plasma TV easily with the comfort of your sofa or bed.|3. This Remote does not have Bluetooth feature. No voice functions. This is a remote control to control TV mode & it does not control or support the set-top box mode.|4. No pairing required after load new AA Alkaline batteries, Samsung Remote suitable for smart tv's and monitor|5. This is a 7SEVEN compatible Product & Not Original Samsung Remote.",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-06-16T12:41:16.815674Z",
    "updatedAt": "2025-10-26T16:58:22.815687Z"
  },
  {
    "name": "Amazonbasics Micro Usb Fast Charging Cable For Android Smartphone,Personal Computer,Printer With Gold Plated Connectors (6 Feet, Black)",
    "category": "Computers&Accessories|Accessories&Peripherals|Cables&Accessories|Cables|USBCable",
    "imageUrl": "https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/31nrDWDT8+L._SX300_SY300_.jpg",
    "description": "Cable Length: 6 Feet (1. 82 Meters)|Gold-Plated Connectors Resist Corrosion For Signal Purity|Smaller Connector Designed To Fit Smaller Spaces|1 Year Limited Warranty|Supports Up To 480 Mbps Data Transmission Speed|Micro Usb Charging Cable For Android Phones|Ideal For Charging Android Phones And Tablets Or Connecting Pc Peripherals Such As Hard Drives, Printers, And More",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-10-29T20:54:30.815852Z",
    "updatedAt": "2025-10-08T09:28:23.815866Z"
  },
  {
    "name": "TP-Link AC600 600 Mbps WiFi Wireless Network USB Adapter for Desktop PC with 2.4GHz/5GHz High Gain Dual Band 5dBi Antenna Wi-Fi, Supports Windows 11/10/8.1/8/7/XP, Mac OS 10.15 and earlier (Archer T2U Plus)",
    "category": "Computers&Accessories|NetworkingDevices|NetworkAdapters|WirelessUSBAdapters",
    "imageUrl": "https://m.media-amazon.com/images/I/216Q4FqmZVL._SX300_SY300_QL70_FMwebp_.jpg",
    "description": "High-Speed Wi-Fi \u2014\u2014 256QAM support increases the 2.4 GHz data rate from 150 Mbps to 200 Mbps, 200 Mbps on the 2.4 GHz band and 433 Mbps on the 5 GHz band, ensure you fully enjoy fast AC Wi-Fi.|Dual Band Wireless \u2014\u2014 2.4 GHz and 5 GHz band provide flexible connectivity, giving your devices access to the latest dual-band Wi-Fi router for faster speed and extended range|High-Gain Antenna \u2014\u2014 A 5dBi high-gain antenna greatly enhances the reception and transmission signal strength of the USB adapter|Supports the Latest Operating Systems \u2014\u2014 Fully compatible with Windows 11/10/8.1/8/7/XP, Mac OS 10.15 and earlier|In an unlikely case of product quality related issue, we may ask you to reach out to brand\u2019s customer service support and seek resolution. We will require brand proof of issue to process replacement request.",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-10-13T14:49:11.816042Z",
    "updatedAt": "2025-10-19T15:51:20.816055Z"
  },
  {
    "name": "AmazonBasics Micro USB Fast Charging Cable for Android Phones with Gold Plated Connectors (3 Feet, Black)",
    "category": "Computers&Accessories|Accessories&Peripherals|Cables&Accessories|Cables|USBCable",
    "imageUrl": "https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/31iESA2h2gL._SY300_SX300_QL70_FMwebp_.jpg",
    "description": "Micro usb charging cable for android phones|Supports up to 480 mbps data transmission speed|Ideal for charging android phones and tablets or connecting pc peripherals such as hard drives, printers, and more|Gold-plated connectors resist corrosion for signal purity|Smaller connector designed to fit smaller spaces|Compact connector head works with nearly all cases|Improved charging capability up to 2100 ma",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-08-08T00:15:22.816178Z",
    "updatedAt": "2025-10-15T02:46:09.816189Z"
  },
  {
    "name": "AmazonBasics New Release Nylon USB-A to Lightning Cable Cord, Fast Charging MFi Certified Charger for Apple iPhone, iPad (6-Ft, Rose Gold)",
    "category": "Computers&Accessories|Accessories&Peripherals|Cables&Accessories|Cables|USBCable",
    "imageUrl": "https://m.media-amazon.com/images/I/31kw1RgU5yL._SX300_SY300_QL70_FMwebp_.jpg",
    "description": "Added Protection: An additional layer of protection has been added to the Lightning and USB ends to improve durability and reduce fraying;",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-11-03T13:16:41.816311Z",
    "updatedAt": "2025-10-10T22:22:32.816322Z"
  },
  {
    "name": "VW 80 cm (32 inches) Frameless Series HD Ready LED TV VW32A (Black)",
    "category": "Electronics|HomeTheater,TV&Video|Televisions|StandardTelevisions",
    "imageUrl": "https://m.media-amazon.com/images/I/418GxB04szL._SY300_SX300_QL70_FMwebp_.jpg",
    "description": "Resolution: HD Ready (1366x768) | Refresh Rate: 60 hertz | Viewing Angle: 178 degrees|Connectivity: 2 HDMI ports to connect set top box, Blu Ray players, gaming console | 2 USB ports to connect hard drives and other USB devices|Sound : 20 Watts output | Powerful Stereo Output | Power Audio, Music Equalizer|Display: A+ Grade Panel | IPE Technology | True Colour | Cinema Zoom | Slim Bezel | Cinema Mode|Warranty Information: 1 year warranty provided by Visio World from date of purchase|Installation: For requesting installation/wall mounting/demo of this product once delivered, please directly call Visio World support on (Please visit brand website for toll free numbers) and provide product's model name as well as seller's details mentioned on the invoice|Easy returns: This product is eligible for replacement/refund within 10 days of delivery in case of any product defects, damage or features not matching the description provided",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-10-26T08:43:13.816455Z",
    "updatedAt": "2025-10-26T08:34:34.816466Z"
  },
  {
    "name": "Ambrane Unbreakable 3A Fast Charging Braided Type C Cable    1.5 Meter (RCT15, Blue) Supports QC 2.0/3.0 Charging",
    "category": "Computers&Accessories|Accessories&Peripherals|Cables&Accessories|Cables|USBCable",
    "imageUrl": "https://m.media-amazon.com/images/W/WEBP_402378-T2/images/I/41rbKciLrcL._SX300_SY300_QL70_FMwebp_.jpg",
    "description": "Compatible with all Type C enabled devices, be it an android smartphone (Mi, Samsung, Oppo, Vivo, Realme, OnePlus, etc), tablet, laptop (Macbook, Chromebook, etc)|Supports Quick Charging (2.0/3.0)|Unbreakable \u2013 Made of special braided outer with rugged interior bindings, it is ultra-durable cable that won\u2019t be affected by daily rough usage|Ideal Length \u2013 It has ideal length of 1.5 meters which is neither too short like your typical 1meter cable or too long like a 2meters cable",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-09-16T21:31:44.816599Z",
    "updatedAt": "2025-10-31T14:00:01.816609Z"
  },
  {
    "name": "Tata Sky Universal Remote",
    "category": "Electronics|HomeTheater,TV&Video|Accessories|RemoteControls",
    "imageUrl": "https://m.media-amazon.com/images/I/315GdnF+LcL._SY300_SX300_.jpg",
    "description": "Universal remote control|Ensures long lastinga and consistent performance|Sturdy built",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-07-24T23:35:18.816803Z",
    "updatedAt": "2025-10-24T17:09:57.816825Z"
  },
  {
    "name": "TP-LINK WiFi Dongle 300 Mbps Mini Wireless Network USB Wi-Fi Adapter for PC Desktop Laptop(Supports Windows 11/10/8.1/8/7/XP, Mac OS 10.9-10.15 and Linux, WPS, Soft AP Mode, USB 2.0) (TL-WN823N),Black",
    "category": "Computers&Accessories|NetworkingDevices|NetworkAdapters|WirelessUSBAdapters",
    "imageUrl": "https://m.media-amazon.com/images/I/41jxZkzNcnL._SX300_SY300_QL70_FMwebp_.jpg",
    "description": "300 Mbps Wi-Fi \u2014\u2014 300Mbps wireless speed ideal for smooth HD video, voice streaming and online gaming|Design \u2014\u2014 Mini-sized design for convenient portability with a reliable high performance|SoftAP Mode \u2014\u2014 Turn a wired internet connection to a PC or Laptop into a Wi-Fi hotspot|\u00b7\u00a0 WPS \u2014\u2014\u00a0Easily setup a secure wireless connection with one-touch WPS button|Compatibility \u2014\u2014 Supports Windows 11/10/8.1/8/7/XP,\u00a0Mac OS 10.15 and earlier, Linux|Interface \u2014\u2014 USB 2.0|In an unlikely case of product quality related issue, we may ask you to reach out to brand\u2019s customer service support and seek resolution. We will require brand proof of issue to process replacement request.",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-06-23T07:40:52.817007Z",
    "updatedAt": "2025-10-10T08:56:53.817026Z"
  },
  {
    "name": "OnePlus 80 cm (32 inches) Y Series HD Ready Smart Android LED TV 32 Y1S (Black)",
    "category": "Electronics|HomeTheater,TV&Video|Televisions|SmartTelevisions",
    "imageUrl": "https://m.media-amazon.com/images/I/512YHGuR4RL._SX300_SY300_QL70_FMwebp_.jpg",
    "description": "Resolution : HD Ready (1366x768) | Refresh Rate : 60 Hertz|Connectivity: 2 HDMI ports to connect set top box, Blu Ray players, gaming console | 2 USB ports to connect hard drives and other USB devices | Dual-band Wi-Fi|Sound : 20 Watts Output | Dolby Audio | Dolby Atmos Decoding|Smart TV features: Latest Android TV 11, OnePlus Connect Ecosystem, Google Assistant, Chromecast, Miracast, DLNA, Auto Low Latency Mode | Supported Apps : Netflix, Youtube, Prime Video, Hotstar, SonyLiv, Hungama, JioCinema, Zee5, Eros Now, Oxygen Play|Display : Bezel-less Design | LED Panel | Anti-Aliasing | Gamma Engine | Decoding of HDR10+, HDR10, HLG|Warranty Information: 1 year comprehensive warranty and additional 1 year on panel provided by the manufacturer from date of purchase|Installation/Wall mounting/demo will be arranged by Amazon Home Services. For any other information, please contact Amazon customer support | Wall Mount is not included in the box and will be charged extra at the time of installat",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-06-01T01:09:08.817167Z",
    "updatedAt": "2025-10-24T13:09:05.817179Z"
  },
  {
    "name": "Wecool Unbreakable 3 in 1 Charging Cable with 3A Speed, Fast Charging Multi Purpose Cable 1.25 Mtr Long, Type C cable, Micro Usb Cable and Cable for iPhone, White",
    "category": "Computers&Accessories|Accessories&Peripherals|Cables&Accessories|Cables|USBCable",
    "imageUrl": "https://m.media-amazon.com/images/W/WEBP_402378-T2/images/I/313uqx3djjL._SX300_SY300_QL70_FMwebp_.jpg",
    "description": "Fast Charging Cable that can be used to charge your smartphone or Tablet or Earbuds or speakers etc...|3 in 1 Fast charging Cable is the best solution for your Travel needs. Just carry a single charging cable that can charge all your electronic Gadgets|The Multi purpose charging cable has 3 charging ports that includes type c cable fast charging 3.0 and Micro usb and charging pin compatible for iphone|The Charging Cable has 12 months of Brand Warranty. Register in the brand website with in 10 days of purchase to avail the warranty. Wecool dot com|Convenient Length cable. The Car charging cable has 1.25 Meters length that is very convenient to use while you travel",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-05-16T09:24:37.817301Z",
    "updatedAt": "2025-10-24T05:43:12.817311Z"
  },
  {
    "name": "Portronics Konnect L 1.2Mtr, Fast Charging 3A Micro USB Cable with Charge & Sync Function (Grey)",
    "category": "Computers&Accessories|Accessories&Peripherals|Cables&Accessories|Cables|USBCable",
    "imageUrl": "https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/31pQZsxPR4L._SX300_SY300_QL70_FMwebp_.jpg",
    "description": "MORE DURABLE- Konnect L Micro cable is unique in terms of design and multi-use and is positioned to provide the best comfort and performance while using|HIGH QUALITY MATERIAL- TPE + Nylon material to make sure that the life of the cable is enhanced significantly|COMPATIBILITY- Compatible with most Android smartphones, windows phone, tablets, PC peripherals and other micro USB compatible devices|CHARGE and SYNC FUNCTION- It comes with Fast Charging and quick Sync Function|LONG CORD- The Cable is extra thick 1.2 meter long, optimized for an easy use for your comfort at home or office",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-07-22T10:03:23.817484Z",
    "updatedAt": "2025-10-21T08:38:32.817493Z"
  },
  {
    "name": "Airtel DigitalTV DTH Television, Setup Box Remote Compatible for SD and HD Recording (Black)",
    "category": "Electronics|HomeTheater,TV&Video|Accessories|RemoteControls",
    "imageUrl": "https://m.media-amazon.com/images/W/WEBP_402378-T2/images/I/41v00lhhdbL._SX300_SY300_QL70_FMwebp_.jpg",
    "description": "This is Generic Airtel Tv Remote|Universal configuration with any TV|Shining black colour with LED indicator",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-05-21T04:18:20.817649Z",
    "updatedAt": "2025-10-15T19:11:39.817659Z"
  },
  {
    "name": "Samsung 108 cm (43 inches) Crystal 4K Neo Series Ultra HD Smart LED TV UA43AUE65AKXXL (Black)",
    "category": "Electronics|HomeTheater,TV&Video|Televisions|SmartTelevisions",
    "imageUrl": "https://m.media-amazon.com/images/I/41Tz1YnJkoL._SY300_SX300_QL70_FMwebp_.jpg",
    "description": "Resolution : Crystal 4K Ultra HD (3840 x 2160) | Refresh Rate : 50 Hertz|Connectivity: 3 HDMI ports to connect set top box, Blu-ray speakers or a gaming console | 1 USB ports to connect hard drives or other USB devices|Display: Ultra HD (4k) LED Panel | One Billion Colors | New Bezel-less Design | Supports HDR 10+ | PurColor | Mega Contarst | UHD Dimming | Auto Game Mode|Sound: 20 Watts Output | Powerful Speakers with Dolby Digital Plus | Q Symphony|Smart TV Features : Prime Video, Hotstar, Netflix, Zee5 and more | Voice Assistant - Bixby & Alexa | Tap View | PC Mode | Universal Guide | Web Browser | Screen Mirroring|Warranty Information: 1 year comprehensive warranty plus additional 1 years on panel by brand from date of invoice|Installation: For requesting installation/wall mounting/demo of this product once delivered, please directly call Samsung support on (Visit Brand website for tollfree numbers) and provide product's model name as well as seller's details mentioned on the invoic",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-08-16T00:03:49.817823Z",
    "updatedAt": "2025-11-01T04:16:40.817864Z"
  },
  {
    "name": "Lapster 1.5 mtr USB 2.0 Type A Male to USB A Male Cable for computer and laptop",
    "category": "Computers&Accessories|Accessories&Peripherals|Cables&Accessories|Cables|USBCable",
    "imageUrl": "https://m.media-amazon.com/images/I/310WOJIrwjL._SX300_SY300_QL70_FMwebp_.jpg",
    "description": "Plug & Play|Stable & Reliable Connectivity.|Special grip treads designed on wire ends for easy plugging and unplugging; plug-and-play.|Connector : USB 2.0 Type A Male to Type A Male|High quality USB 2.0 high speed cable. Usually used for some external drive enclosures or cameras.|Compatibility with USB 1.0,1.1 , Supporting data transfer rate at up to 480Mbps|High quality thin USB type A adapter M/M is designed for Data Transfer and fast Charging, ideal for hard drive enclosure, printer, modem, scanner, camera etc. Interference Free",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-08-06T21:43:35.818130Z",
    "updatedAt": "2025-10-31T16:17:56.818154Z"
  },
  {
    "name": "AmazonBasics USB Type-C to USB Type-C 2.0 Cable - 3 Feet Laptop (0.9 Meters) - White",
    "category": "Computers&Accessories|Accessories&Peripherals|Cables&Accessories|Cables|USBCable",
    "imageUrl": "https://m.media-amazon.com/images/W/WEBP_402378-T2/images/I/414y0iu5NUL._SX300_SY300_QL70_FMwebp_.jpg",
    "description": "Connect Usb Type-C Enabled Devices (Macbook, Chromebook Pixel, Galaxy Note 7 Etc.) With Standard Usb Type-C 2.0 Enabled Devices And Accessories (Smartphones, Car/Wall Charger, Multi-Port Adapters Etc.)|1 Year Limited Warranty|Up To 480 Mbps Data Transfer Speed; Power Output Up To 5V, 3 Amp|Certified By Usb-If To Be Compliant With Usb 2.0|Type-C Port Is Half The Width And One-Third The Height Of A Standard Usb-A Connector (Slightly Larger Compared To Lightning Or Micro-Usb Ports)|Ideal For Charging And Powering Usb Type-C Enabled Devices, As Well As Syncing Data, Photos And Music|Reversible Design - Easily Insert The Connector Into Any Type-C Enabled Device (Does Not Matter Which Side Is Up)",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-09-20T21:55:34.818374Z",
    "updatedAt": "2025-10-08T08:21:31.818390Z"
  },
  {
    "name": "Redmi 80 cm (32 inches) Android 11 Series HD Ready Smart LED TV | L32M6-RA/L32M7-RA (Black)",
    "category": "Electronics|HomeTheater,TV&Video|Televisions|SmartTelevisions",
    "imageUrl": "https://m.media-amazon.com/images/W/WEBP_402378-T2/images/I/41611VFTGwL._SY300_SX300_QL70_FMwebp_.jpg",
    "description": "Resolution: HD Ready (1366 x 768) | Refresh Rate: 60 hertz | 178 Degree wide viewing angle|Connectivity: 2 HDMI ports to connect set top box, Blu-Ray players, gaming console | 2 USB ports to connect hard drives and other USB devices | 3.5mm to connect your headphones | Bluetooth 5.0 to connect Bluetooth speakers, earphones and TWS earphones|Sound: 20 Watts Powerful Stereo Speakers | Dolby Audio | DTS Virtual: X and DTS-HD | Dolby Atmos pass through ARC port|Smart TV Features : Android TV 11 | Chromecast built-in | PatchWall 4 with IMDb integration | Kids Mode with Parental Lock | 75+ Free Live Channels | Universal search | Language Universe (16+ Languages) | India's Top 10 | Miracast | Supported Apps: Prime Video | Netflix | Disney + Hotstar | YouTube | Apple TV | 5000+ apps from Play Store | Auto Low Latency Mode | Quad core processor | Dual band Wi-Fi | 1GB RAM + 8GB Storage|Display: A+ Grade LED panel | Vivid Picture Engine | Detailed Picture Controls | Ultra bright screen | Dynamic",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-08-10T07:07:16.818532Z",
    "updatedAt": "2025-10-23T10:33:11.818544Z"
  },
  {
    "name": "Amazon Basics High-Speed HDMI Cable, 6 Feet (2-Pack),Black",
    "category": "Electronics|HomeTheater,TV&Video|Accessories|Cables|HDMICables",
    "imageUrl": "https://m.media-amazon.com/images/I/41eJqkFjCRL._SY300_SX300_QL70_FMwebp_.jpg",
    "description": "HDMI A Male to A Male Cable: Supports Ethernet, 3D, 4K video and Audio Return Channel (ARC)|Connects Blu-ray players, Fire TV, Apple TV, PS4, PS3, XBox one, Xbox 360, computers and other HDMI-enabled devices to TVs, displays, A/V receivers and more|Cable allows you to share an Internet connection among multiple devices without the need for a separate Ethernet cable|Meets HDMI 2.0 standards (4K Video at 60 Hz, 2160p, 48 bit/px color depth) that supports bandwidth up to 18Gbps and backwards compatible with earlier versions|Note: Supports Max resolution of 4K@60Hz, for display issues downgrade resolution & gradually increase resolution for compatibility/display issues.|Cable Length: 6 feet (1.8 meters) - 2 units; 1 year limited warranty",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-09-27T12:56:15.818733Z",
    "updatedAt": "2025-10-14T14:29:28.818762Z"
  },
  {
    "name": "Portronics Konnect L 20W PD Quick Charge Type-C to 8-Pin USB Mobile Charging Cable, 1.2M, Tangle Resistant, Fast Data Sync(Grey)",
    "category": "Computers&Accessories|Accessories&Peripherals|Cables&Accessories|Cables|USBCable",
    "imageUrl": "https://m.media-amazon.com/images/I/41x3iKbD-+L._SX342_SY445_.jpg",
    "description": "[1.2 M LONG DURABLE CABLE] : The Konnect L is about 1.2 M long and this feature allows for maximum convenience of the user. Not only is the cable length ample it also is durably built which ensures that no matter how roughly its handled no harm is done to it!|[20 W PD QUICK CHARGE FOR 8 PIN USB] : The Konnect L cable for 8 pin USB is an efficient cable for Apple smartphones charging and is as powerful as its Apple counterparts. You can plug in your smartphone for lightning speed charging!|[TPE & NYLON BRAIDED CORD] : The cable has been designed for optimal results and keeping this in mind it has been built with TPE and has further been nylon braided to ensure longevity and safe upkeep.|[TANGLE RESISTANT] : Isn\u2019t it frustrating when we are in a hurry to charge our devices, and while pulling out the charger find it all entangled up? This is why we came up with this feature that will not only make charging hassle free but also ensure the cable\u2019s longevity.|[FAST DATA SYNC] : Sync data fro",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-06-18T04:04:03.819024Z",
    "updatedAt": "2025-11-01T19:21:08.819039Z"
  },
  {
    "name": "Acer 80 cm (32 inches) N Series HD Ready TV AR32NSV53HD (Black)",
    "category": "Electronics|HomeTheater,TV&Video|Televisions|StandardTelevisions",
    "imageUrl": "https://m.media-amazon.com/images/I/51FicDnawaL._SY300_SX300_QL70_FMwebp_.jpg",
    "description": "Resolution: HD Ready (1366 x 768) | Refresh Rate: 60Hz | 178 Degree wide viewing angle|Connectivity: 2 HDMI Ports to connect set top box, Blu Ray players, gaming console | 2 USB Ports to connect hard drives and other USB devices | 1 VGA Slot to connect your Laptop/PC | 1 Headphone Jack | 2 AV Input Slot | 1 RF Slot|Sound: 20 Watts Output|Display: High Definition | Dynamic Contast | Intelligent Signal Calibration | 16.7 Million Colours | Digital Noise Reduction|Warranty Information: 1 year comprehensive warranty provided by the manufacturer from date of purchase|Installation: Installation/Wall mounting/demo will be arranged by AHS Team. For any other information, please contact Amazon customer support|Easy Returns: This product is eligible for replacement within 10 days of delivery in case of any product defects, damage or features not matching the description",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-06-13T03:30:13.819282Z",
    "updatedAt": "2025-10-20T20:43:59.819298Z"
  },
  {
    "name": "Model-P4 6 Way Swivel Tilt Wall Mount 32-55-inch Full Motion Cantilever for LED,LCD and Plasma TV's",
    "category": "Electronics|HomeTheater,TV&Video|Accessories|TVMounts,Stands&Turntables|TVWall&C",
    "imageUrl": "https://m.media-amazon.com/images/I/41+mgWz7knL._SX300_SY300_.jpg",
    "description": "Full motion cantilever mount|Fits 32inch-55inch flat panel display|Vesa compliance 100x100 to 400x400mm",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-09-15T18:23:02.819447Z",
    "updatedAt": "2025-10-30T11:03:23.819458Z"
  },
  {
    "name": "Amazon Basics USB Type-C to USB-A 2.0 Male Fast Charging Cable for Laptop - 3 Feet (0.9 Meters), Black",
    "category": "Computers&Accessories|Accessories&Peripherals|Cables&Accessories|Cables|USBCable",
    "imageUrl": "https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/31-BRsjrvDL._SY300_SX300_QL70_FMwebp_.jpg",
    "description": "Connect USB Type-C enabled devices (MacBook, Chromebook Pixel, Galaxy Note 7, etc.) with standard USB Type-A enabled devices (laptops, hard drives, power banks, wall/car chargers, etc.)|Ideal for charging and powering USB Type-C enabled devices, as well as syncing data, photos and music|Reversible design - easily insert the Type-C connector into any Type-C enabled device (does not matter which side is up)|Type-C port is half the width and one-third the height of a standard USB-A connector (slightly larger compared to Lightning or Micro-USB ports)|Up to 480 Mbps data transfer speed; power output up to 5V, 3 Amp|Certified by USB-IF to be compliant with USB 2.0 Standard",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-10-15T21:32:46.819579Z",
    "updatedAt": "2025-11-02T03:08:53.819590Z"
  },
  {
    "name": "oraimo 65W Type C to C Fast Charging Cable USB C to USB C Cable High Speed Syncing, Nylon Braided 1M length with LED Indicator Compatible For Laptop, Macbook, Samsung Galaxy S22 S20 S10 S20Fe S21 S21 Ultra A70 A51 A71 A50S M31 M51 M31S M53 5G",
    "category": "Computers&Accessories|Accessories&Peripherals|Cables&Accessories|Cables|USBCable",
    "imageUrl": "https://m.media-amazon.com/images/I/41gztmbiIgL._SX300_SY300_QL70_FMwebp_.jpg",
    "description": "\ud83e\udd47\u3010Kindly NOTE before you purchase\u3011:This is a USB-C to USB-C cable, which means it has the same USB C or Type C plug on both sides, please keep a note that this cable is not a USB-C to USB-A cable. Besides, you may need a USB C wall charger to charge your device. This product DO NOT support video output and monitor connection.|\ud83e\udd47\u301065W High Speed Charging\u3011: Build-in updated smart chip, which makes this USB-C to USB-C PD cable strong enough to support max 3.25A current 65W power through, as well as support fast charging for more Type-C devices. You need a USB C wall charger for your device to charge and we would like you to recommend to use the original wall charger.|\ud83e\udd47\u3010Compatible Devices\u3011:This USB C to USB C cable compatible with Samsung S20, S21 Ultra, A71, laptop Macbook, Samsung S21 S22 S20 FE 2022 A71, A51, A33, M51, M31, M31s, M33, M53, Macbook Air, Macbook Pro, Macbook Air M1|\ud83e\udd47\u3010Military grade material\u3011:Strong military fiber, the most flexible, powerful and durable material, makes tens",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-05-28T18:16:44.819710Z",
    "updatedAt": "2025-10-11T00:19:09.819720Z"
  },
  {
    "name": "CEDO 65W OnePlus Dash Warp Charge Cable, USB A to Type C Data Sync Fast Charging Cable Compatible with One Plus 3 /3T /5 /5T /6 /6T /7 /7T /7 pro & for All Type C Devices - 1 Meter, Red",
    "category": "Computers&Accessories|Accessories&Peripherals|Cables&Accessories|Cables|USBCable",
    "imageUrl": "https://m.media-amazon.com/images/W/WEBP_402378-T2/images/I/41SNaWjuZWL._SX300_SY300_QL70_FMwebp_.jpg",
    "description": "FAST AND STABLE CHARGING: Flexible USB type c cable, broad internal cabling made of copper and nickel ensures that power reaches your device much faster. 60% charging capacity in around 30 minutes with the original charger adapter.|EXTRA TOUGH, EXTRA SLEEK: Our premium, intricate flat wire not only makes the cable durable and long lasting to suit a variety of everyday connection needs but also ensures it lasts several times longer than standard cables.|RELIABLE AND SAFE: The smart chip inside it can intelligently identify the current required by your device to prevent it from overheating and overcharging.|HIGH SPEED DATA SYNC: Supports data transmission at up to 480 Mbps, which can save a lot of time when transferring data such as files, photos, music, movies, videos, etc. between your phone and other devices.|WIDE COMPATIBILITY: The Type C cable is compatible with all the latest android smart phones, earbuds & tablets with type c ports. On the other end, USB Type A connector can be us",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-07-30T13:27:25.820017Z",
    "updatedAt": "2025-10-06T18:01:19.820033Z"
  },
  {
    "name": "Redmi 108 cm (43 inches) 4K Ultra HD Android Smart LED TV X43 | L43R7-7AIN (Black)",
    "category": "Electronics|HomeTheater,TV&Video|Televisions|SmartTelevisions",
    "imageUrl": "https://m.media-amazon.com/images/W/WEBP_402378-T2/images/I/41w1didcczL._SY300_SX300_QL70_FMwebp_.jpg",
    "description": "Resolution : 4K Ultra HD (3840x2160) Resolution | Refresh Rate : 60 Hertz | 178 Degree wide viewing angle|Connectivity: Dual-band Wi-Fi | Bluetooth 5.0 | 3 HDMI ports to connect latest gaming consoles, set top box, Blu-ray Players | 2 USB ports to connect hard drives and other USB devices | eARC - Dolby Atmos Passthrough eARC HDMI port | Optical Port|Sound: 30 Watts Output | Dolby Audio | DTS Virtual: X | Dolby Atmos pass through eARC | DTS-HD|Smart TV Features : Android TV 10, PatchWall 4 with IMDb integration | Quad core processor, Built-in Wi-Fi, Chromecast built-in, Ok Google, Auto Low Latency Mode, 2GB RAM + 16GB Storage, Miracast | Supported Apps: Prime Video, Netflix, Disney + Hotstar, YouTube, Apple TV, 5000+ apps from Play Store,|Display: 4K LED Panel | Dolby Vision | HDR10 | HLG | Reality Flow | Vivid Picture Engine | MEMC|Warranty Information: 1 year comprehensive warranty on product and 1 year additional on Panel provided by the brand from the date of purchase|Installation ",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-08-30T15:52:31.820166Z",
    "updatedAt": "2025-10-27T02:52:00.820190Z"
  },
  {
    "name": "Pinnaclz Original Combo of 2 Micro USB Fast Charging Cable, USB Charging Cable for Data Transfer Perfect for Android Smart Phones White 1.2 Meter Made in India (Pack of 2)",
    "category": "Computers&Accessories|Accessories&Peripherals|Cables&Accessories|Cables|USBCable",
    "imageUrl": "https://m.media-amazon.com/images/I/41gFqSHngyL._SX300_SY300_QL70_FMwebp_.jpg",
    "description": "[SYNC & CHARGE] : Ideal for charging and powering Micro USB port devices, as well as syncing data, photos and music.|[EASE OF USE] : Smoothly insert the Micro USB connector in a right way in your device.|[SYNC DATA] : Transfer data at high speeds.|[WARRANTY] : 6 Months hassle free warranty from the manufacturer.",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-10-16T16:01:42.820372Z",
    "updatedAt": "2025-10-28T08:02:46.820387Z"
  },
  {
    "name": "boAt Type C A750 Stress Resistant, Tangle-free, Sturdy Flat Cable with 6.5A Fast Charging & 480Mbps Data Transmission, 10000+ Bends Lifespan and Extended 1.5m Length(Rebellious Black)",
    "category": "Computers&Accessories|Accessories&Peripherals|Cables&Accessories|Cables|USBCable",
    "imageUrl": "https://m.media-amazon.com/images/I/41jlh3c7UbL._SX300_SY300_QL70_FMwebp_.jpg",
    "description": "The boAt Type C A750 cable is compatible with smartphones, tablets, PC peripherals, Bluetooth speakers, power banks and all other devices with Type-C ports.|It ensures 6.5A fast charging for all the latest charging protocols and data transmissions with rapid sync at 480 Mbps|The convenient flat cable design makes it tangle free, sturdy and invincible against external damage.|Its ultra-durable PVC housing shell housing and extended tail protection makes it last longer to give a 10000+ Bends Lifespan.|boAt's Type C A750 cable offers a perfect 1.5 meters in length for smooth & hassle-free user experience.|2 years warranty from the date of purchase.",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-06-13T14:10:12.820524Z",
    "updatedAt": "2025-10-07T21:01:31.820536Z"
  },
  {
    "name": "Ambrane 2 in 1 Type-C & Micro USB Cable with 60W / 3A Fast Charging, 480 mbps High Data, PD Technology & Quick Charge 3.0, Compatible with All Type-C & Micro USB Devices (ABDC-10, Black)",
    "category": "Computers&Accessories|Accessories&Peripherals|Cables&Accessories|Cables|USBCable",
    "imageUrl": "https://m.media-amazon.com/images/I/31x3IUfMneL._SX300_SY300_QL70_FMwebp_.jpg",
    "description": "Stay ahead and never miss out with a 3A fast charging speed for your devices|It supports Quick Charge 2.0/ 3.0 technology to keep your devices boosted up|Its sturdy design and braided cord are tough enough to withstand 10000+ bends|Crafted for convenience, it allows you to charge and sync data with just one cable|It is widely compatible with all types of Micro USB & Type-C enabled devices",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-10-29T05:10:33.820656Z",
    "updatedAt": "2025-10-13T15:33:10.820669Z"
  },
  {
    "name": "Ambrane 60W / 3A Fast Charging Output Cable with Type-C to USB for Mobile, Neckband, True Wireless Earphone Charging, 480mbps Data Sync Speed, 1m Length (ACT - AZ10, Black)",
    "category": "Computers&Accessories|Accessories&Peripherals|Cables&Accessories|Cables|USBCable",
    "imageUrl": "https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/31l-eZHBfKL._SX300_SY300_QL70_FMwebp_.jpg",
    "description": "Fast Charging Cable - The cable can support upto a charging speed of 3A making it the optimal cable for Quick Charge / Rapid Charge and Turbo Charge devices.|Reversible Connector \u2013 It has reversible type c connector that can be plugged in any direction, upside or downside.|Durable Cable- Using only premium quality materials and a tough, durable PVC Coating, the Ambrane USB cable is built for connecting and disconnecting over and over again without signal loss.|High Speed Data Transfer- 480 Mbps data transfer speed allows you to sync the data to the computer or other USB devices within few seconds.|Genuine USB Connectors- We use only certified and high-quality connectors ensuring not only the safety of the connected device but also reliable charging and high-speed data transmission.",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-08-02T12:54:52.820871Z",
    "updatedAt": "2025-10-09T14:15:44.820889Z"
  },
  {
    "name": "TCL 80 cm (32 inches) HD Ready Certified Android Smart LED TV 32S5205 (Black)",
    "category": "Electronics|HomeTheater,TV&Video|Televisions|SmartTelevisions",
    "imageUrl": "https://m.media-amazon.com/images/I/51ow6bmLWIL._SY300_SX300_QL70_FMwebp_.jpg",
    "description": "Resolution: HD Ready (1366 x 768) | Refresh Rate: 60 hertz|Connectivity: 2 HDMI Ports to connect set top box | 1 USB ports to connect hard drives or other USB devices | IR Port to control connected devices like DVD / STB Players|Sound: 16 Watts Output | Powerful Speakers with Dolby Audio|Smart TV Features : Android R 11 ,Packed with amazing smart features such as Google Voice Search, Google App Store and Built-in Chromecast. Google Play Store, YouTube, Google cast, Netflix.|Display : LED Smart TV | Ultra bright screen for flawless picture quality even in bright rooms|Warranty Information: 2 year comprehensive warranty provided by the manufacturer from date of purchase|Installation: For Installation, Wall Mounting, Demo Of This Product Once Delivered, Directly Contact Brand Support (Visit Brand website for Toll free numebrs) and Provide Product's Model Name And Seller's Details Mentioned On Your Invoice. The Service Center Will Allot You A Convenient Slot For The Service",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-09-11T23:01:18.821062Z",
    "updatedAt": "2025-10-29T06:51:38.821084Z"
  },
  {
    "name": "SWAPKART Fast Charging Cable and Data Sync USB Cable Compatible for iPhone 6/6S/7/7+/8/8+/10/11, 12, 13 Pro max iPad Air/Mini, iPod and iOS Devices (White)",
    "category": "Computers&Accessories|Accessories&Peripherals|Cables&Accessories|Cables|USBCable",
    "imageUrl": "https://m.media-amazon.com/images/I/41KmCJuybRL._SX300_SY300_QL70_FMwebp_.jpg",
    "description": "[High Compatibility] : This iphone data cable supports with iPhone 6,6s,6 plus,6s plus,7 7 plus ,8 8plus,x,xs,11 pro max,12 mini pro max,13 mini pro max iPad Air, iPad mini, iPod Nano and iPod Touch|[Fast Charge&Data Sync ] : It can charge and sync simultaneously at a rapid speed, Compatible with any charging adaptor, multi-port charging station or power bank ,for fast charging ,fast adapter is must.|\ud83d\ude0d\u3010Durable Spring Protection\u3011\uff1aThe easy-to-break connection port is protected by spring, which is a flexible and durable cable.You can use it with confidence.|\u3010 Ultra High Quality\u3011: According to the experimental results, the fishbone design can accept at least 20,000 bending and insertion tests for extra protection and durability. Upgraded 3D aluminum connector and exclusive laser welding technology, which to ensure the metal part won't break and also have a tighter connection which fits well even with a protective case on and will never loose connection.|\u3010 Good After Sales Service\u3011-Our frie",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-08-05T03:41:02.821292Z",
    "updatedAt": "2025-10-09T01:39:14.821307Z"
  },
  {
    "name": "Firestick Remote",
    "category": "Electronics|HomeTheater,TV&Video|Accessories|RemoteControls",
    "imageUrl": "https://m.media-amazon.com/images/I/31C4z2M8TiL._SX300_SY300_QL70_FMwebp_.jpg",
    "description": "Compatible For Amazon Fire TV Stick (3rd Gen, 2021) | Compatible For Amazon Fire TV Stick Lite | Compatible For Amazon Fire TV Stick (2nd Gen) | Compatible For Amazon Fire TV Stick 4K | Compatible For Amazon Fire TV Stick 4K Max streaming device | Compatible For Amazon Fire TV Stick Plus (2021)|This is voice remote control, you need to pair it first before you use, and below is pairing steps: Press the Home button about 8-30 seconds until the LED starts to rapidly flash amber, then the remote should automatically pair with your device.|With standard navigation and playback controls, you can quickly skip to your favorite scenes.|Alexa funtion make it easily to find, launch and control all existing content you want, such as play music, view sports scores, check the weather, see live camera feeds, and control compatible smart home devices.",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-06-06T20:47:29.821522Z",
    "updatedAt": "2025-10-31T22:39:09.821537Z"
  },
  {
    "name": "Wayona Usb Nylon Braided Data Sync And Charging Cable For Iphone, Ipad Tablet (Red, Black)",
    "category": "Computers&Accessories|Accessories&Peripherals|Cables&Accessories|Cables|USBCable",
    "imageUrl": "https://m.media-amazon.com/images/W/WEBP_402378-T2/images/I/41xmv3WPs7L._SX300_SY300_QL70_FMwebp_.jpg",
    "description": "[High Compatibility] : Compatible For iPhone X/Xs Max/Xr, Phone 8/8 Plus,Phone 7/7 Plus,Phone 6s/6s Plus,Phone 6/6 Plus,5/5s/5c/SE,Pad Pro,Pad Air 1/2,Pad mini 1/2/3,Pod nano7,Pod touch and more devices.|[Fast Charge&Data Sync ] : It can charge and sync simultaneously at a rapid speed, Compatible with any charging adaptor, multi-port charging station or power bank.|[Durability] : Durable nylon braided design with premium aluminum housing and toughened nylon fiber wound tightly around the cord lending it superior durability and adding a bit to its flexibility.|[High Security Level ] : It is designed to fully protect your device from damaging excessive current.Copper core thick+Multilayer shielding, Anti-interference, Protective circuit equipment.|[WARRANTY] 12-months warranty and friendly customer services, ensures the long-time enjoyment of your purchase. If you meet any question or problem, please don't hesitate to contact us. (10am - 7pm Working days)",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-07-29T11:26:30.821721Z",
    "updatedAt": "2025-10-10T03:15:48.821734Z"
  },
  {
    "name": "Flix (Beetel) Usb To Type C Pvc Data Sync And 2A 480Mbps Data Sync, Tough Fast Charging Long Cable For Usb Type C Devices, Charging Adapter (White, 1 Meter) - Xcd-C12",
    "category": "Computers&Accessories|Accessories&Peripherals|Cables&Accessories|Cables|USBCable",
    "imageUrl": "https://m.media-amazon.com/images/W/WEBP_402378-T2/images/I/31DDGpem3OL._SY445_SX342_QL70_FMwebp_.jpg",
    "description": "Durable Pvc Outer Exterior: Pvc Cables Are Versatile, High In Tensile Strength, Flexible, And Good Conductors|Flix C12 Data And Charging Cable Is Equipped With A Type-C Usb Port, The Cable Supports Up To 2.4Amps Of Power Output For Powering And Fast Charging Your Smart Device|Type-C Usb Cable Is 1 Meter In Length, Optimized For Easy Use For Your Comfort At Home Or Office, Helps You To Overcome Distance Restrictions|Charge & Sync, This Usb Cable Can Charge And Data Sync Simultaneously At 480Mbps Speed, Compatible With All Devices With A C-Type Usb Port",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-07-23T02:01:19.821956Z",
    "updatedAt": "2025-11-03T13:32:54.821971Z"
  },
  {
    "name": "SKYWALL 81.28 cm (32 inches) HD Ready Smart LED TV 32SWELS-PRO (Black)",
    "category": "Electronics|HomeTheater,TV&Video|Televisions|SmartTelevisions",
    "imageUrl": "https://m.media-amazon.com/images/I/41M9BBMSUdL._SX300_SY300_QL70_FMwebp_.jpg",
    "description": "Resolution: Full HD (1920 x 1080) | Refresh Rate: 60 hertz|Connectivity: 2 HDMI ports to connect set top box | Blu Ray players | gaming console | 2 USB ports to connect hard drives and other USB devices|Sound output: 30 Watts Output | Dolby Audio|Smart TV Features: Built|in Wi|Fi | Netflix | Google Play Store | YouTube | Chrome cast | Media center | with Google Voice Assistant | Android 9.O Based OS|Display: A+ Grade Panel | Micro Dimming | True Color | View Angle: 178 degree | 2K HDR10 | 16.7 Million(8bit)|Warranty Information: 1 Year warranty provided by Skywall from date of purchase.|Installation: Brand will contact for installation for this product once delivered. Contact brand Support for assistance @ (Please visit brand website for tollfree numbers) and provide product's model name and seller's details mentioned on your invoice. The service center will allot you a convenient slot for the service.|Easy returns: This product is eligible for replacement within 10 days of delivery in",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-08-10T09:01:49.822144Z",
    "updatedAt": "2025-10-16T19:22:58.822158Z"
  },
  {
    "name": "boAt A 350 Type C Cable for Smartphone, Charging Adapter (1.5m, Carbon Black)",
    "category": "Computers&Accessories|Accessories&Peripherals|Cables&Accessories|Cables|USBCable",
    "imageUrl": "https://m.media-amazon.com/images/I/412XfBAEikL._SX300_SY300_QL70_FMwebp_.jpg",
    "description": "A 350 Offers Universal Compatibility With Smartphones, Tablets, Pc Peripherals, Bluetooth Speakers, Power Banks And All Other Devices With Type C Port|It Supports 3A Fast Charging For Extraordinary Efficiency. Durable Pvc Housing Lasts 6 Times Longer With 10000+ Bends Lifespan|The Cable Supports Data Transmissions With Rapid Sync At 480 Mbps|The Reversible Metallic Aluminium Tip Lets The User Connect Devices In A Carefree Manner|It Dons Premium Cotton Braided Skin That Makes It Sturdy And Invincible Against External Damage|With 10000+ Bends Lifespan The Cable Stays Stronger And Lasts Longer|A 350 Cable Is Designed With A Perfect 1.5 Meters In Length For Hassle Free Usage|2 years warranty from the date of purchase",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-05-15T12:18:07.822331Z",
    "updatedAt": "2025-10-08T21:26:13.822345Z"
  },
  {
    "name": "Wayona Usb Type C Fast Charger Cable Fast Charging Usb C Cable/Cord Compatible For Samsung Galaxy S10E S10 S9 S8 Plus S10+,Note 10 Note 9 Note 8,S20,M31S,M40,Realme X3,Pixel 2 Xl (3 Ft Pack Of 1,Grey)",
    "category": "Computers&Accessories|Accessories&Peripherals|Cables&Accessories|Cables|USBCable",
    "imageUrl": "https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/41J6oGU8w5L._SX300_SY300_QL70_FMwebp_.jpg",
    "description": "Fast Charge & Data Sync: Fast charge& data transfer USB A to USB C, conforming to the USB Type C Specification version 1.1, 56kilohm, which ensure a safe charging at 4.8A Maximum. Charging and syncing 2 in 1, data transfer speed up to 480Mbps.|Extreme Durability: Over 10000 bending tests,This type c cable is far more durable than the same price, Premium nylon braided type c cable adds additional durability and tangle free.|Convenient Design:The light and space-saving 1M USB Type C cable, it\u2019s perfect for your Home, the office desk, always keep your space tidy, super easy to carry and convenient for traveling, making your life more convenient.|Wide Compatibility: This USB A to USB C Charger Cable compatible with Samsung Galaxy S10e S10 S10 plus S9 S9 plus S8 S8 plus, Note 10 Note 10 plus Note9 note8, a40 a50 a70 a80 A3 A5 2017, Sony Xperia XZ3 XZ2 Premium XA2 XA1,XZ1, Moto G6 G6 plus G7 G7 power G7 play G7 plus Z Z2 Z3 X4, LG G8 G7 G6 G5 V40 V35 V30 V20, Googel Pixel 2 xl, HTC 10 U11.|P",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-09-22T06:49:22.822488Z",
    "updatedAt": "2025-10-22T06:43:59.822505Z"
  },
  {
    "name": "OnePlus 108 cm (43 inches) Y Series 4K Ultra HD Smart Android LED TV 43Y1S Pro (Black)",
    "category": "Electronics|HomeTheater,TV&Video|Televisions|SmartTelevisions",
    "imageUrl": "https://m.media-amazon.com/images/W/WEBP_402378-T2/images/I/51ovMTXv9RL._SX300_SY300_QL70_FMwebp_.jpg",
    "description": "Resolution : 4K Ultra HD (3840x2160) | Refresh Rate : 60 Hertz|Connectivity: 3 HDMI ports to connect set top box, Blu Ray players, gaming console | 2 USB ports to connect hard drives and other USB devices | Dual-band Wi-Fi|Sound : 24 Watts Output | Dolby Audio | Dolby Atmos Decoding|Smart TV features: Android TV | OnePlus Connect Ecosystem| Google Assistant | Chromecast, Miracast, DLNA | Auto Low Latency Mode | Supported Apps : Netflix, Youtube, Prime Video, Hotstar, SonyLiv, Hungama, JioCinema, Zee5, Eros Now, Oxygen Play|Display : Bezel-less Design | Decoding of HDR10+ HDR10, HLG | 1 billion colors | Gamma Engine with MEMC|Warranty Information: 1 year comprehensive warranty and additional 1 year on panel provided by the manufacturer from date of purchase|Installation/Wall mounting/demo will be arranged by Amazon Home Services. For any other information, please contact Amazon customer support | Wall Mount is not included in the box and will be charged extra at the time of installation",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-09-14T01:32:52.822690Z",
    "updatedAt": "2025-10-27T23:37:12.822712Z"
  },
  {
    "name": "Acer 127 cm (50 inches) I Series 4K Ultra HD Android Smart LED TV AR50AR2851UDFL (Black)",
    "category": "Electronics|HomeTheater,TV&Video|Televisions|SmartTelevisions",
    "imageUrl": "https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/41imW51RweL._SY300_SX300_QL70_FMwebp_.jpg",
    "description": "Resolution : 4K Ultra HD (3840x2160) | Refresh Rate : 60 Hertz | 178 Degree wide viewing angle|Connectivity: Dual band Wifi | 2 way Bluetooth | HDMI ports 2.1 x 3 (HDMI 1 supports eARC) to connect personal computer, laptop, set top box, Blu-ray speakers or a gaming console | USB ports 2.0 x 1, 3.0 x 1 to connect hard drives or other USB device|Sound: 30 Watts Output | High Fidelity Speakers with Dolby Audio | 5 Sound Modes - Movie, Music, Standard, News, Sports|Smart Tv Features: Google certified Android TV 11 | Google Assistant | Chromecast built-in | Voice controlled Smart Remote | Hotkeys for Quick Access - Netflix, Prime Video, YouTube, Disney+Hotstar | 5 Picture Mode | 2GB RAM | 16GB Storage | 64bit Quad Core Processor|Display : 1.07 Billion colours | MEMC | Wide Colour Gamut+ | Intelligent Frame Stabilization Engine | Dynamic Signal Calibration | HDR10+ with HLG | UHD Upscaling | Super Brightness | Micro Dimming | Blue Light Reduction | 178 degree Wide viewing angle|Warranty Info",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-07-06T21:19:44.822878Z",
    "updatedAt": "2025-10-15T21:27:25.822901Z"
  },
  {
    "name": "Samsung 108 cm (43 inches) Crystal 4K Series Ultra HD Smart LED TV UA43AUE60AKLXL (Black)",
    "category": "Electronics|HomeTheater,TV&Video|Televisions|SmartTelevisions",
    "imageUrl": "https://m.media-amazon.com/images/I/41RVzq6GiIL._SY300_SX300_QL70_FMwebp_.jpg",
    "description": "Resolution : Crystal 4K UHD (3840x2160) resolution | Refresh Rate : 60 Hertz|Connectivity: 3 HDMI ports to connect set top box, Blu-ray speakers or a gaming console | 1 USB ports to connect hard drives or other USB devices|Display: Ultra HD (4k) LED Panel | One Billion Colors | Air Slim Design | Supports HDR 10+ | PurColor | Mega Contarst | UHD Dimming | Auto Game Mode|Sound: 20 Watts Output | Powerful Speakers with Dolby Digital Plus | Q Symphony|Smart TV Features : Prime Video, Hotstar, Netflix, Zee5 and more | Tap View | PC Mode | Universal Guide | Web Browser | Screen Mirroring|Warranty Information: 1 Year warranty provided by manufacturer from date of purchase and 1 Year Additional on Panel|Installation: For requesting installation/wall mounting/demo of this product once delivered, please directly call Samsung support on [1800407267864 / 180057267864] and provide product's model name as well as seller's details mentioned on the invoice",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-09-07T15:30:42.823070Z",
    "updatedAt": "2025-10-13T13:19:15.823089Z"
  },
  {
    "name": "Lapster 65W compatible for OnePlus Dash Warp Charge Cable , type c to c cable fast charging Data Sync Cable Compatible with One Plus 10R / 9RT/ 9 pro/ 9R/ 8T/ 9/ Nord & for All Type C Devices \u2013 Red, 1 Meter",
    "category": "Computers&Accessories|Accessories&Peripherals|Cables&Accessories|Cables|USBCable",
    "imageUrl": "https://m.media-amazon.com/images/W/WEBP_402378-T2/images/I/3135yilFsfL._SY445_SX342_QL70_FMwebp_.jpg",
    "description": "-1 meter type c to c cable fast charging cable Convenient for all types of USB C Laptops, Tablets, And Smartphones.|-6.5 Amp USB C Cable compatibility with All 60W 45W 30W 18W 15W USB-C Power Adapters, Support Pd 3.0 And Qc 3.0 Fast Charge for Your Devices. Data Transfer Speed Is Up To 480Mbps Of USB 2.0. Note: Not Support Video Transfer.AM|-USB C To C Cable Support Warp Charge For One plus 8T, One plus 9/9 Pro, Too Fast Charge For MacBook Air 13 Inch 2020/2019/2018, For MacBook Pro 13/15/16 Inch AM|Compatiblity with type c to c cable fast charging cabe is Newest 2020/2019/2018/2017/2016, For iPad Mini 2021, For iPad Pro 12.9/11 Inch 2020, For Google Pixel 6/6 Pro/5/4A/4 Xl/4/3A Xl/3A/3 Xl/3/2 Xl/2, For Samsung Galaxy S21 Fe 5G/S20 Fe 5G/Note 20 Ultra/Note 20/S20/S20+/S20 Ultra, Galaxy Z Flip 3, Galaxy Z Fold 3, And More Devices.|65 watt type c cable is in Premium Silicon Coating, High-Quality, Prolong Bending Lifespan , Pure Copper Core, . Both USB C Connectors are Designed with An Ad",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-08-27T14:17:50.823329Z",
    "updatedAt": "2025-10-23T16:48:41.823342Z"
  },
  {
    "name": "Wayona Nylon Braided (2 Pack) Lightning Fast Usb Data Cable Fast Charger Cord For Iphone, Ipad Tablet (3 Ft Pack Of 2, Grey)",
    "category": "Computers&Accessories|Accessories&Peripherals|Cables&Accessories|Cables|USBCable",
    "imageUrl": "https://m.media-amazon.com/images/I/412fvb7k2FL._SX300_SY300_QL70_FMwebp_.jpg",
    "description": "[High Compatibility] : iPhone X/XsMax/Xr ,iPhone 8/8 Plus,iPhone 7/7 Plus,iPhone 6s/6s Plus,iPhone 6/6 Plus,iPhone 5/5s/5c/se,iPad Pro,iPad Air 1/2,iPad mini 1/2/3,iPod nano7,iPod touch and more apple devices.|[Fast Charge&Data Sync ] : It can charge and sync simultaneously at a rapid speed, Compatible with any charging adaptor, multi-port charging station or power bank.|[Durability] : Durable nylon braided design with premium aluminum housing and toughened nylon fiber wound tightly around the cord lending it superior durability and adding a bit to its flexibility.|[High Security Level ] : It is designed to fully protect your device from damaging excessive current.Copper core thick+Multilayer shielding, Anti-interference, Protective circuit equipment.",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-10-29T22:25:16.823471Z",
    "updatedAt": "2025-10-10T11:09:37.823487Z"
  },
  {
    "name": "Gizga Essentials USB WiFi Adapter for PC, 150 Mbps Wireless Network Adapter for Desktop - Nano Size WiFi Dongle Compatible with Windows, Mac OS & Linux Kernel | WPA/WPA2 Encryption Standards| Black",
    "category": "Computers&Accessories|NetworkingDevices|NetworkAdapters|WirelessUSBAdapters",
    "imageUrl": "https://m.media-amazon.com/images/I/31mgo4D-kPL._SX300_SY300_QL70_FMwebp_.jpg",
    "description": "USB WiFi Adapter: Fast wireless transmission at up to 150 Mbps ideal for video streaming, gaming and internet calls|USB 2.0 Interface: Supports high speed USB 2.0 interface for a seamless experience|Advanced Security: Supports 64/128 WEP, WPA, PA2/WPA-PSK/WPA2-PSK(TKIP/AES) wireless security|Nano Design: High performing nano-size design for portability|Easy Installation: Includes quick installation and configuration guide",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-05-25T15:07:32.823654Z",
    "updatedAt": "2025-10-11T14:45:41.823674Z"
  },
  {
    "name": "OnePlus 108 cm (43 inches) Y Series Full HD Smart Android LED TV 43 Y1S (Black)",
    "category": "Electronics|HomeTheater,TV&Video|Televisions|SmartTelevisions",
    "imageUrl": "https://m.media-amazon.com/images/I/51F6FClq10L._SX300_SY300_QL70_FMwebp_.jpg",
    "description": "Resolution : Full HD (1920x1080) | Refresh Rate : 60 Hertz|Connectivity: 2 HDMI ports to connect set top box, Blu Ray players, gaming console | 2 USB ports to connect hard drives and other USB devices | Dual-band Wi-Fi|Sound : 20 Watts Output | Dolby Audio | Dolby Atmos Decoding|Smart TV features: Latest Android TV 11, OnePlus Connect Ecosystem, Google Assistant, Chromecast, Miracast, DLNA, Auto Low Latency Mode | Supported Apps : Netflix, Youtube, Prime Video, Hotstar, SonyLiv, Hungama, JioCinema, Zee5, Eros Now, Oxygen Play|Display : Bezel-less Design | LED Panel | Anti-Aliasing | Gamma Engine | Decoding of HDR10+, HDR10, HLG|Warranty Information: 1 year comprehensive warranty and additional 1 year on panel provided by the manufacturer from date of purchase|Installation/Wall mounting/demo will be arranged by Amazon Home Services. For any other information, please contact Amazon customer support | Wall Mount is not included in the box and will be charged extra at the time of installat",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-07-20T10:21:15.823881Z",
    "updatedAt": "2025-10-17T02:37:09.823901Z"
  },
  {
    "name": "boAt Deuce USB 300 2 in 1 Type-C & Micro USB Stress Resistant, Sturdy Cable with 3A Fast Charging & 480mbps Data Transmission, 10000+ Bends Lifespan and Extended 1.5m Length(Mercurial Black)",
    "category": "Computers&Accessories|Accessories&Peripherals|Cables&Accessories|Cables|USBCable",
    "imageUrl": "https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/4112nea7JlL._SX300_SY300_QL70_FMwebp_.jpg",
    "description": "The boAt Deuce USB 300 2 in 1 cable is compatible with smartphones, tablets, PC peripherals, Bluetooth speakers, power banks and all other devices with Type-C as well as Micro USB port|It ensures 3A fast charging and data transmissions with rapid sync at 480 mbps|The premium Nylon braided skin makes it sturdy and invincible against external damage|Its Aluminium alloy shell housing makes it last longer with 10000+ Bends Lifespan with extended frame protection for strain relief|The resilient and flexible design offers a tangle free experience seamlessly|Deuce USB 300 cable offers a perfect 1.5 meters in length for smooth & hassle-free user experience|2 years warranty from the date of purchase",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-06-29T19:03:35.824084Z",
    "updatedAt": "2025-10-05T14:06:15.824097Z"
  },
  {
    "name": "Lapster USB 3.0 A to Micro B SuperSpeed for hard disk cable - short cable",
    "category": "Computers&Accessories|Accessories&Peripherals|Cables&Accessories|Cables|USBCable",
    "imageUrl": "https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/31Uqr+A2THL._SY300_SX300_.jpg",
    "description": "-High performance Micro USB 3.0 hard disk cable connects a portable external USB 3.0 hard drive to a computer for speedy file transfer or syncs and charges tablets or smartphones or USB 3.0 Micro-B port devices|-Super Speed USB 3.0 data transfer cables are compatible with most USB 3.0 external portable and desktop hard disk connector|-USB 3.0 micro b cable offer a throughput of up to 4.8Gbps when used with a USB 3.0 host and device AK9|-Replacement USB 3.0 Cables for external hard disk wire|-Connector A: USB 3.0 A (9 pin SuperSpeed) Male Connector B: USB 3.0 Micro-B (10 pin SuperSpeed) Male Superspeed USB 3.0 hard disk cable A to Micro B (10pin) Quickly transfer data from an external storage device to your PC or Laptop at 10x the speed of USB 2.0",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-08-21T15:35:41.824291Z",
    "updatedAt": "2025-10-23T02:40:17.824306Z"
  },
  {
    "name": "TCL 100 cm (40 inches) Full HD Certified Android R Smart LED TV 40S6505 (Black)",
    "category": "Electronics|HomeTheater,TV&Video|Televisions|SmartTelevisions",
    "imageUrl": "https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/41mMrtrwgyL._SY300_SX300_QL70_FMwebp_.jpg",
    "description": "Resolution: Full HD (1920 x 1080) | Refresh Rate: 60 Hertz|Connectivity: 2 HDMI Ports to connect set top box, Blu Ray players, gaming console | 1 USB Ports to connect hard drives and other USB devices|Sound : 20 Watts Output | Powerful 2 Stero Integrated Speaker Boxes with Dolby Audio|Smart TV Features: AI-IN | Built-in WiFi | Android R (Certified by Google) | Built-in Chromecast | 64 bit Quad Core Processor | Prime video | Youtube | Netflix | Voice Search | 1 GB RAM + 8 GB ROM|Display: Slim Design | A+ Grade Panel | Micro Dimming | View Angle : 178 degree | HDR|Warranty Information: 2 year comprehensive warranty provided by the manufacturer from date of purchase|Installation: For Installation, Wall Mounting, Demo Of This Product Once Delivered, Directly Contact Brand Support (Visit Brand website for Toll free numebrs) and Provide Product's Model Name And Seller's Details Mentioned On Your Invoice. The Service Center Will Allot You A Convenient Slot For The Service",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-07-16T06:19:52.824481Z",
    "updatedAt": "2025-10-30T00:03:43.824499Z"
  },
  {
    "name": "ZEBRONICS ZEB-USB150WF1 WiFi USB Mini Adapter Supports 150 Mbps Wireless Data, Comes with Advanced Security WPA/WPA2 encryption Standards",
    "category": "Computers&Accessories|NetworkingDevices|NetworkAdapters|WirelessUSBAdapters",
    "imageUrl": "https://m.media-amazon.com/images/W/WEBP_402378-T2/images/I/317-HiMYIgS._SY300_SX300_QL70_FMwebp_.jpg",
    "description": "Supports 150Mbps Wireless data transmission rate|Fully compliant with USB v2.0 High-speed mode|Advanced Security WPA/WPA2 encryption standards|IEEE 802.11 b/g/n client|Access Point mode for Hotspot|Miniature Design",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-06-03T22:41:34.824692Z",
    "updatedAt": "2025-10-14T15:07:17.824706Z"
  },
  {
    "name": "LOHAYA Remote Compatible for Mi Smart LED TV 4A Remote Control (32\"/43\") [ Compatible for Mi Tv Remote Control ] [ Compatible for Mi Smart LED Tv Remote Control ]",
    "category": "Electronics|HomeTheater,TV&Video|Accessories|RemoteControls",
    "imageUrl": "https://m.media-amazon.com/images/I/21PB1kWQWdL._SX300_SY300_QL70_FMwebp_.jpg",
    "description": "Compatible with MI Smart TV 4A 32 inch LED TV /Mi 4A 43 inch LED TV | Mi LED Smart TV 4A (32 inch/43 inch) Mi Smart Android LED TV|100% Best Quality Plastic Body and Soft Silicone Rubber Keypad|Remotes are checked by Testing Machine Before Shipment|Imported Generic Product Not by MI|Please Match the Image with Your Existing Remote Before Placing the Order",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-07-09T05:29:40.824891Z",
    "updatedAt": "2025-10-18T16:07:36.824908Z"
  },
  {
    "name": "Gilary Multi Charging Cable, 3 in 1 Nylon Braided Fast Charging Cable for iPhone Micro USB Type C Mobile Phone | Colour May Vary |",
    "category": "Computers&Accessories|Accessories&Peripherals|Cables&Accessories|Cables|USBCable",
    "imageUrl": "https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/41nGfip4QuS._SX300_SY300_QL70_FMwebp_.jpg",
    "description": "The cable comes with 3 Different pins allowing you to charge your Android, iOS and Type-C devices at the same time|High-quality copper wires promote maximum signal quality and strength|Ensure a maximum charging speed up to 2A, charge faster than most standard cables.|This multi charger cable widely compatible with all Smartphones.|What You Get: 1 x 3 in 1 Multi Charging Cable (with Mini USB, Micro USB, Type C)",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-06-15T11:20:13.825058Z",
    "updatedAt": "2025-10-16T01:40:26.825070Z"
  },
  {
    "name": "TP-Link UE300 USB 3.0 to RJ45 Gigabit Ethernet Network Adapter - Plug and Play",
    "category": "Computers&Accessories|NetworkingDevices|NetworkAdapters|WirelessUSBAdapters",
    "imageUrl": "https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/219039qa+PL._SY300_SX300_.jpg",
    "description": "Fastest USB 3.0 and Gigabit solution ensure high-speed transfer rate|Plug and Play for Windows (11/10), Mac OS (10.9 & later versions), Chrome OS, and Linux OS.|Foldable and Portable design ideally suits your Ultrabook|In an unlikely case of product quality related issue, we may ask you to reach out to brand\u2019s customer service support and seek resolution. We will require brand proof of issue to process replacement request.",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-07-12T06:19:34.825192Z",
    "updatedAt": "2025-10-06T09:53:11.825203Z"
  },
  {
    "name": "Wayona Type C to Lightning MFI Certified 20W Fast charging Nylon Braided USB C Cable for iPhone 14, 14 Pro, 14 Pro Max, 14 Plus, 13, 13 Pro, 13 Pro Max, 13 Mini, 12, 12 Pro, 11, 11 Pro Max iPhone 12 Mini, X, 8 (2M, Grey)",
    "category": "Computers&Accessories|Accessories&Peripherals|Cables&Accessories|Cables|USBCable",
    "imageUrl": "https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/41fRMsvSy8L._SY445_SX342_QL70_FMwebp_.jpg",
    "description": "\u3010Power Delivery Fast Charging\u3011: Charge your iPhone 12 from 0% to 50% in just 30 mins. Wayona USB C to Lightning Cable supports fast charging for iPhone 14, 14 Plus, 14 Pro, 14 Pro Max,13, 13 Pro, 13 Pro Max, 13 Mini, 12, 12 Mini, 12 Pro, 12 Pro Max, 11, 11 Pro, 11 Pro Max, SE, X, XS, XR, XS Max, 8, 8 Plus, and other later models when using your Type C Power Delivery Charger (including 18W, 20W, 29W, 30W, 61W, or 87W USB C Power Adapter).|\u3010New C94 Connector\u3011: This cable uses the Newest MFI Certified C94 Chip which is specially designed for fast charging, whose color is different from the previous C48 connector end. Charging Speeds 2.5\u00d7 Faster.|\u3010Compatibility List\u3011: Wayona USB C to Lightning cable supports PD Fast Charge 3A (max) for iPad 8th iPad 2020, iPhone 13 Pro/Pro Max/ Mini, 12/12 Mini/12 Pro/12 Pro Max/11/11 Pro/11 Pro Max/XS Max/XS/XR/X/8 Plus/8 and iPad Pro 12.9\" gen1/iPad Pro 12.9\" gen2/iPad Pro 10.5\"/iPad Air3 10.5\"/iPad mini5 7.9\"; This cable also supports the standard charg",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-06-28T02:05:38.825345Z",
    "updatedAt": "2025-10-17T01:21:43.825358Z"
  },
  {
    "name": "Dealfreez Case Compatible with Fire TV Stick 3rd Gen 2021 Full Wrap Silicone Remote Cover Anti-Lost with Loop (D-Black)",
    "category": "Electronics|HomeTheater,TV&Video|Accessories|RemoteControls",
    "imageUrl": "https://m.media-amazon.com/images/I/41pA1xo-mIL._SX300_SY300_QL70_FMwebp_.jpg",
    "description": "\u3010Compatibility\u3011: Specially Designed for Fire TV Stick All New Alexa Voice Remote Control (3rd Gen)(2021 Release). (REMOTE NOT INCLUDED)|\u30103 Meters Shockproof\u3011: Durable Silicone Material can protect your remote from 3 meters high drop, effectively protects your remote from daily impact and unwanted dust and scratches.|\u3010Perfect Fit\u3011: The slim and form-fitted design of the case fully protects your Fire TV Remote with minimal bulk.|\u3010Accessibility\u3011: Revised with precision cut-outs to ensure full access to all ports, buttons, and features of your Fire TV Stick 3rd Gen 2021 All New Alexa Voice Remote.|\u3010Remote Loop\u3011: An included wrist strap is provided that helps prevent accidental drops or releases when using the remote with motion controls.",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-07-11T02:37:25.825540Z",
    "updatedAt": "2025-10-29T17:20:02.825554Z"
  },
  {
    "name": "Amazon Basics New Release Nylon USB-A to Lightning Cable Cord, Fast Charging MFi Certified Charger for Apple iPhone, iPad (3-Ft, Rose Gold)",
    "category": "Computers&Accessories|Accessories&Peripherals|Cables&Accessories|Cables|USBCable",
    "imageUrl": "https://m.media-amazon.com/images/I/31kw1RgU5yL._SX300_SY300_QL70_FMwebp_.jpg",
    "description": "Added Protection: An additional layer of protection has been added to the Lightning and USB ends to improve durability and reduce fraying;",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-10-06T14:52:20.825739Z",
    "updatedAt": "2025-10-14T16:32:31.825753Z"
  },
  {
    "name": "Isoelite Remote Compatible for Samsung LED/LCD Remote Control Works with All Samsung LED/LCD TV Model No :- BN59-607A (Please Match The Image with Your Old Remote)",
    "category": "Electronics|HomeTheater,TV&Video|Accessories|RemoteControls",
    "imageUrl": "https://m.media-amazon.com/images/W/WEBP_402378-T2/images/I/41UJEnTJpVL._SX300_SY300_QL70_FMwebp_.jpg",
    "description": "Compatible Device For Samsung LED/LCD Remote Control Works With All Samsung LED/LCD TV Model No :- BN59-607A|100% Best Quality Plastic Body and Soft Silicone Rubber Keypad|Remotes are checked by Testing Machine Before Shipment|Imported Generic Product Not by Samsung",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-07-30T13:55:24.825992Z",
    "updatedAt": "2025-11-03T10:23:45.826014Z"
  },
  {
    "name": "MI 100 cm (40 inches) 5A Series Full HD Smart Android LED TV with 24W Dolby Audio & Metal Bezel-Less Frame (Black) (2022 Model)",
    "category": "Electronics|HomeTheater,TV&Video|Televisions|SmartTelevisions",
    "imageUrl": "https://m.media-amazon.com/images/W/WEBP_402378-T2/images/I/41GTMteNtdL._SX300_SY300_QL70_FMwebp_.jpg",
    "description": "Note : The brands, Mi and Xiaomi, are part of the same multinational conglomerate|Resolution : Full HD (1920 x 1080) Resolution | Refresh Rate : 60 Hertz | 178 Degree wide viewing angle|Connectivity: Dual Band Wi-Fi | 2 HDMI ports to connect latest gaming consoles, set top box, Blu-ray Players | 2 USB ports to connect hard drives and other USB devices | ALLM | ARC | Bluetooth 5.0 | Ethernet|Sound: 24 Watts Output | Dolby Audio, DTS:X, DTS Virtual: X|Smart TV Features : Android TV 11 | PatchWall | IMDb Integration | Universal Search | 300+ Free Live Channels | Kids Mode with Parental lock | Smart Recommendations | Language Universe \u2013 15+ Languages | User Centre | Okay Google | Chromecast suporting Apps : Netflix, Prime Video, Disney+ Hotstar | 5000+ apps from Play Store |Quad core Cortex A55 | Chromecast built-in | Ok Google | Auto Low Latency Mode | 1.5 GB RAM + 8GB Storage|Display: Full HD | Vivid Picture Engine|Warranty Information: 1 year comprehensive warranty on product and 1 year",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-09-06T21:31:09.826190Z",
    "updatedAt": "2025-10-24T23:07:12.826203Z"
  },
  {
    "name": "Wayona Nylon Braided USB Data Sync and Fast Charging 3A Short Power Bank Cable For iPhones, iPad Air, iPad mini, iPod Nano and iPod Touch (Grey)",
    "category": "Computers&Accessories|Accessories&Peripherals|Cables&Accessories|Cables|USBCable",
    "imageUrl": "https://m.media-amazon.com/images/W/WEBP_402378-T2/images/I/41c80KrMZgL._SY445_SX342_QL70_FMwebp_.jpg",
    "description": "[High Compatibility] : iPhones, iPad Air, iPad mini, iPod Nano and iPod Touch|[Fast Charge&Data Sync ] : It can charge and sync simultaneously at a rapid speed, Compatible with any charging adaptor, multi-port charging station or power bank.|\u3010Short and Convenient Design\u3011: The light and space-saving 0.25M/0.83ft USB cable, it\u2019s perfect for your power bank, the office desk, always keep your space tidy, super easy to carry and convenient for traveling, making your life more convenient.|[High Security Level ] : It is designed to fully protect your device from damaging excessive current.Copper core thick+Multilayer shielding, Anti-interference, Protective circuit equipment.",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-07-28T20:54:46.826337Z",
    "updatedAt": "2025-10-05T00:40:24.826349Z"
  },
  {
    "name": "Wayona Type C To Type C Long Fast Charging Cable Type C Charger Cord Compatible With Samsung S22 S20 S20 Fe 2022 S22 Ultra S21 Ultra A70 A51 A53 A33 A73 M51 M31 M33 M53 (Grey, 2M, 65W, 6Ft)",
    "category": "Computers&Accessories|Accessories&Peripherals|Cables&Accessories|Cables|USBCable",
    "imageUrl": "https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/41A4CcuIJuL._SY445_SX342_QL70_FMwebp_.jpg",
    "description": "\u3010NOTE before purchase\u3011: This is a USB C to USB C cable, which means it has the same USB C plug on both ends, please be aware that this is not a USB C to USB A cable. Besides, you may need a USB C wall charger to charge your device.|\u301065W High Speed Charging\u3011: Output power up to 20V 3.25A, which is ensured by high-speed safe charging, and the USB 2.0 supports data transfer speed can reach 40~60MB/S (480Mbps). NOTE: This product DO NOT support video output and monitor connection.|\u3010Compatibility List\u3011: This USB C to USB C cable compatible with Samsung Galaxy S21 S21+ / S20 S20+ S20 Ultra Note10/Note 10 Plus,S20, S21 Ultra, iPad Air 2020 10.9\u2018\u2019 (Gen 4), iPad Pro 12.9'' Gen3 (2018) , iPad Pro 11'' (2018), Nexus 6P/5X , Compatible with Macbook with the original charger (View Product Description for details)|\u3010Military grade material\u3011: Strong military fiber, the most flexible, powerful and durable material, makes tensile force increased by 200%. Special Strain Relief design, can bear 10000+ ben",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-08-09T23:50:04.826519Z",
    "updatedAt": "2025-10-23T22:00:33.826540Z"
  },
  {
    "name": "Wayona Nylon Braided 2M / 6Ft Fast Charge Usb To Lightning Data Sync And Charging Cable For Iphone, Ipad Tablet (6 Ft Pack Of 1, Grey)",
    "category": "Computers&Accessories|Accessories&Peripherals|Cables&Accessories|Cables|USBCable",
    "imageUrl": "https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/51UsScvHQNL._SX300_SY300_QL70_FMwebp_.jpg",
    "description": "[High Compatibility] : Phone X/XsMax/Xr ,Phone 8/8 Plus,Phone 7/7 Plus,Phone 6s/6s Plus,Phone 6/6 Plus,Phone 5/5s/5c/se,Pad Pro,Pad Air 1/2,Pad mini 1/2/3,Pod nano7,Pod touch and more devices.|[Fast Charge&Data Sync ] : It can charge and sync simultaneously at a rapid speed, Compatible with any charging adaptor, multi-port charging station or power bank.|[Durability] : Durable nylon braided design with premium aluminum housing and toughened nylon fiber wound tightly around the cord lending it superior durability and adding a bit to its flexibility.|[High Security Level ] : It is designed to fully protect your device from damaging excessive current.Copper core thick+Multilayer shielding, Anti-interference, Protective circuit equipment.|[WARRANTY] 12-months warranty and friendly customer services, ensures the long-time enjoyment of your purchase. If you meet any question or problem, please don't hesitate to contact us. (10am - 7pm Working days)",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-08-04T02:18:02.826739Z",
    "updatedAt": "2025-10-06T01:03:37.826752Z"
  },
  {
    "name": "CROSSVOLT Compatible Dash/Warp Data Sync Fast Charging Cable Supported for All C Type Devices (Cable)",
    "category": "Computers&Accessories|Accessories&Peripherals|Cables&Accessories|Cables|USBCable",
    "imageUrl": "https://m.media-amazon.com/images/W/WEBP_402378-T2/images/I/41LXLeCw3VL._SX300_SY300_QL70_FMwebp_.jpg",
    "description": "Compatible for oneplus 9 PRO/9/9R/8T/8PRO/7PRO/7T/76T/6/5T/5/3T/3 enabled devices. This charger and cable is 100% Compatible for C type devices|THIS CABLE WILL ONLY WORK WITH TYPE C PORTS, Certified USB-IF Type C seamless connector ensures safety and fast charging, 56k Ohm resistor means no damage to your USB devices while charging.|Please Charge-enabled devices exclusively with the official Power Adapter and Type-C Cable WORK WITH TYPE C PORTS, Certified USB-IF Type C seamless connector ensures safety and fast charging, 56k Ohm resistor means no damage to your USB devices while charging.|Automatically switch to protected mode when the battery is fully charged. Output 5v 4.0a fast charging to save your time|30 Days Replacement Warranty",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-07-26T16:42:02.826956Z",
    "updatedAt": "2025-10-29T22:30:36.826970Z"
  },
  {
    "name": "VU 139 cm (55 inches) The GloLED Series 4K Smart LED Google TV 55GloLED (Grey)",
    "category": "Electronics|HomeTheater,TV&Video|Televisions|SmartTelevisions",
    "imageUrl": "https://m.media-amazon.com/images/I/41pdZIhY+gL._SY300_SX300_.jpg",
    "description": "Resolution: 4K Ultra HD (3840x2160) | Refresh Rate: 60 hertz | 178 Degree wide viewing angle|Connectivity: 3 HDMI ports to connect set top box, Blue Ray players, gaming console | 2 USB ports to connect hard drives and other USB devices | 2.4/5GHz WiFi | HDMI CEC & eARC/ARC | Bluetooth 5.1|Sound : 104 Watt DJ Sound | Built-in Subwoofer | Dolby Atmos | Full range 4 Speaker | 1 Subwoofer | Surround Sound | Bass Boost|Smart TV Features : Google TV | Watchlist | Kids Mode | Google play store | Handsfree Mic | ActiVoice Remote Control | Hotkeys on Remote Control | Chromecast Built-In|Display : 4K Glo PanelI94% NTSC Color VolumeIDolby Vision IQIHDR10+IHLGIAI PQ EngineIDynamic Backlight ControlIAmbient Light SensorIMEMCIMotion EnhancementIDigital Noise ReductionIActive ContrastIAdvanced Cricket ModeICinema Mode IVRRIALLMIGame ModeIResolution 3840 x 2160|Warranty Information: 1-year warranty provided by the manufacturer from date of purchase|Installation/Wall mounting/Demo will be arranged by A",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-08-23T04:54:25.827190Z",
    "updatedAt": "2025-10-20T06:12:06.827205Z"
  },
  {
    "name": "PTron Solero T241 2.4A Type-C Data & Charging USB Cable, Made in India, 480Mbps Data Sync, Durable 1-Meter Long USB Cable for Type-C USB Devices for Charging Adapter (Black)",
    "category": "Computers&Accessories|Accessories&Peripherals|Cables&Accessories|Cables|USBCable",
    "imageUrl": "https://m.media-amazon.com/images/W/WEBP_402378-T2/images/I/41CB7sKZvCL._SX300_SY300_QL70_FMwebp_.jpg",
    "description": "Solero T241 data and charging cable is equipped with a Type-C USB port, the cable supports up to 2.4Amps of power output for powering and fast charging your smart device.|Charge & sync, this USB cable can charge and data sync simultaneously at 480Mbps speed, compatible with all devices with a C-Type USB port.|Durable PVC Outer Exterior: PVC cables are versatile, high in tensile strength, flexible, and good conductors.|pTron Solero T241 Type-C USB cable is 1 meter in length, optimized for easy use for your comfort at home or office, helps you to overcome distance restrictions.|This data and charging C-type USB cable has gone through scientific tests like 5000 times USB insert, 24 hours salt spray, and 10000+ bend life span which ensures long service life.",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-10-31T11:54:45.827364Z",
    "updatedAt": "2025-10-23T09:15:31.827377Z"
  },
  {
    "name": "Croma 80 cm (32 Inches) HD Ready LED TV (CREL7369, Black) (2021 Model)",
    "category": "Electronics|HomeTheater,TV&Video|Televisions|StandardTelevisions",
    "imageUrl": "https://m.media-amazon.com/images/I/41fruBt99gL._SX300_SY300_QL70_FMwebp_.jpg",
    "description": "Resolution: HD Ready (1366 x 768p) | Refresh Rate: 60Hz|Connectivity: 2 HDMI Ports to connect set top box, Blu Ray players, gaming console | 2 USB Ports to connect hard drives and other USB devices | 1 VGA Slot to connect your Laptop/PC | 1 Headphone Jack | 2 AV Input Slot | 1 RF Slot|Sound: 20 Watts Output | Dual Speakers | In-Built Surround Sound|Display: A+ Grade Panel | 178 Degree Wide Viewing Angle | 1 Year Zero Dot Warranty | Blue Screen | Colour Temperature | Noise Reduction | Brightness: 280nits|Warranty: 1 Year Standard Manufacturer Warranty From Croma|Easy Returns: This Product Is Eligible For Replacement Within 10 Days Of Delivery In Case Of Any Product Defects, Damage Or Features Not Matching The Description Provided",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-07-03T18:13:49.827503Z",
    "updatedAt": "2025-10-08T10:13:08.827514Z"
  },
  {
    "name": "boAt Laptop, Smartphone Type-c A400 Male Data Cable (Carbon Black)",
    "category": "Computers&Accessories|Accessories&Peripherals|Cables&Accessories|Cables|USBCable",
    "imageUrl": "https://m.media-amazon.com/images/W/WEBP_402378-T2/images/I/41jk4zYjTsL._SX300_SY300_QL70_FMwebp_.jpg",
    "description": "2 meter special reversible Type-C to USB A male user-friendly design helps you insert the connector in a right way all the time|Support the maximum 3A fast charging and the speed of data sync up to 480 mbps|Aesthetically designed, aluminium ends, with high-density boAt's premium nylon braiding wrapped around the entire length of the tangle free cable for reinforcement and added durability|One end normal USB type a and other end USB type c|2 years warranty from the date of purchase, you can activate your warranty by giving a missed call on 9223032222. Alternatively you can claim your warranty at or reach out to us at +912249461882/info@i.",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-08-17T15:24:11.827674Z",
    "updatedAt": "2025-11-02T17:27:28.827702Z"
  },
  {
    "name": "LG 80 cm (32 inches) HD Ready Smart LED TV 32LQ576BPSA (Ceramic Black)",
    "category": "Electronics|HomeTheater,TV&Video|Televisions|SmartTelevisions",
    "imageUrl": "https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/41WD+zBGibL._SY300_SX300_.jpg",
    "description": "Resolution: HD Ready (1366x768) | Refresh Rate: 60 hertz | Resolution Upscaler | 178 Degree wide viewing angle|Connectivity: 2 HDMI ports to connect set top box, Blu Ray players, gaming console | 1 USB ports to connect hard drives and other USB devices | 2-Way Bluetooth|Sound: 10 Watts Output | Dolby Digital Plus Sound Configuration | AI Sound | Virtual Surround 5.1 | Bluetooth Surround Ready | AI Acoustic Tuning|Smart TV Features: \u03b15 Gen 5 AI Processor | Web OS Operating System | Wi-Fi | Magic Remote | Full Web Browser | Screen Share | Game Optimizer | Built-in Alexa | Google Assistant | AI Functions | Works with Apple AirPlay & Homekit | HDR 10 Pro | 8 GB Storage | Supported Apps: Prime Video, Netflix, Disney+ Hotstar, Sony Liv, Zee5, Apple TV and more|Display: LED Panel | HD Ready Digital Video Format | Slim & Stylish Design|Warranty Information: 1 Year LG India Comprehensive Warranty and additional 1 year Warranty is applicable on panel/module from the date of purchase|Installation",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-10-09T17:08:59.827921Z",
    "updatedAt": "2025-10-17T01:12:34.827935Z"
  },
  {
    "name": "boAt Type C A750 Stress Resistant, Tangle-free, Sturdy Flat Cable with 6.5A Fast Charging & 480Mbps Data Transmission, 10000+ Bends Lifespan and Extended 1.5m Length(Radiant Red)",
    "category": "Computers&Accessories|Accessories&Peripherals|Cables&Accessories|Cables|USBCable",
    "imageUrl": "https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/41+3EsgcpzL._SY300_SX300_.jpg",
    "description": "The boAt Type C A750 cable is compatible with smartphones, tablets, PC peripherals, Bluetooth speakers, power banks and all other devices with Type-C ports.|It ensures 6.5A fast charging for all the latest charging protocols and data transmissions with rapid sync at 480 Mbps|The convenient flat cable design makes it tangle free, sturdy and invincible against external damage.|Its ultra-durable PVC housing shell housing and extended tail protection makes it last longer to give a 10000+ Bends Lifespan.|boAt's Type C A750 cable offers a perfect 1.5 meters in length for smooth & hassle-free user experience.|2 years warranty from the date of purchase",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-08-12T05:22:08.828094Z",
    "updatedAt": "2025-10-07T23:14:47.828117Z"
  },
  {
    "name": "Cotbolt Silicone Protective Case Cover for LG an MR21GA Magic Remote Shockproof for LG Smart TV Remote 2021 Protective Skin Waterproof Anti Lost (Black) (Remote Not Included)",
    "category": "Electronics|HomeTheater,TV&Video|Accessories|RemoteControls",
    "imageUrl": "https://m.media-amazon.com/images/W/WEBP_402378-T2/images/I/41dNwzNOc3L._SX300_SY300_QL70_FMwebp_.jpg",
    "description": "Silicone protective cover is specially designed for LG Smart TV magic remotes of LG AN-MR21GA / LG AN-MR21GC \u3010NOTE: REMOTE CONTROL NOT INCLUDED\u3011|3 Meters Shockproof:Thicken layer silicone case protects against 3 meters highdrops accidental and adds grip to the remote. Adds more security for your LG AN-MR21GA Magic Remote remote from daily impact .|Protective Skin:Eco-friendly and durable silicone case material\uff0ceffectively protects the skin of children, pregnant women and family members.|Full access to all buttons, ports and functions. Easy to install, just slide the LG AN-MR21GA / LG AN-MR21GC Remote into the case.",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-06-16T08:24:00.828306Z",
    "updatedAt": "2025-10-17T16:49:33.828325Z"
  },
  {
    "name": "Portronics Konnect L POR-1403 Fast Charging 3A Type-C Cable 1.2 Meter with Charge & Sync Function for All Type-C Devices (White)",
    "category": "Computers&Accessories|Accessories&Peripherals|Cables&Accessories|Cables|USBCable",
    "imageUrl": "https://m.media-amazon.com/images/I/21rxGo3S7FL._SY445_SX342_QL70_FMwebp_.jpg",
    "description": "[CHARGE & SYNC FUNCTION]- This cable comes with charging & Data sync function for smartphones|[HIGH QUALITY MATERIAL]- TPE + Nylon Material to make sure that the life of the cable is enhanced significantly|[LONG CORD]- The Cable is extra thick 1.2 meter long, optimized for an easy use for your comfort at home or office|[MORE DURABLE]-This cable is unique interms of design and multi-use and is positioned to provide the best comfort and performance while using|[UNIVERSAL COMPATIBILITY]-Charge for all Type C USB connectivity devices including MacBook 12 inch, Nexus 5x, Nexus 6p, OnePlus 2, pixel c, Lumia 950, Lumia 950 xl, Nokia n1, etc.",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-07-20T16:16:55.828497Z",
    "updatedAt": "2025-10-11T01:46:50.828510Z"
  },
  {
    "name": "Electvision Remote Control Compatible with Amazon Fire tv Stick (Pairing Manual Will be Back Side Remote Control)(P)",
    "category": "Electronics|HomeTheater,TV&Video|Accessories|RemoteControls",
    "imageUrl": "https://m.media-amazon.com/images/I/31sBb-2L8KL._SX300_SY300_QL70_FMwebp_.jpg",
    "description": "*Please match your previous remote before placing order. or for verification of remote contact our coustmer care 7738090464",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-07-19T02:39:35.828638Z",
    "updatedAt": "2025-10-11T11:56:16.828649Z"
  },
  {
    "name": "King Shine Multi Retractable 3.0A Fast Charger Cord, Multiple Charging Cable 4Ft/1.2m 3-in-1 USB Charge Cord Compatible with Phone/Type C/Micro USB for All Android and iOS Smartphones (Random Colour)",
    "category": "Computers&Accessories|Accessories&Peripherals|Cables&Accessories|Cables|USBCable",
    "imageUrl": "https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/416GZEi9SuL._SX300_SY300_QL70_FMwebp_.jpg",
    "description": "One for All: Charge any of your devices with the 3-in-1 retractable charging cable, built-in Micro USB, USB-C, and iOS connectors.|No need to carry any other cables when you are in a car, office ,travelling or house guests,it was created exclusively for the purposes of convenient charging several devices simultaneously or individually.|Compatible iPhone 11 Pro i Phone 11 iPhone 11 Pro Max iPhone XR iPhone XS iPhone XS Max iPhone X iPhone 8 iPhone 8 Plus iPhone 7 iPhone 7 Plus iPhone SE iPhone 6s iPhone 6s Plus iPhone 6 iPhone 6 Plus iPhone 5s i-Pad Air (3rd generation) i-Pad mini (5th generation) i-Pad (6th generation) i-Pad Pro 12.9-inch (2nd generation) i-Pad Pro 10.5-inch (5th generation) i-Pad Pro 9.7-inch Pro 12.9-inch (1st generation) i-Pad Air 2 i-Pad mini 4 i-Pad mini 3 i-Pad Air mini 2 iPod touch (6th generation)|Flexible Cable Length: Easy to coil and organize Rope Streamer, without tangles. Keeping the cable organized when you don't want to use that length or shape storage y",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-10-22T04:49:11.828859Z",
    "updatedAt": "2025-11-02T23:18:59.828874Z"
  },
  {
    "name": "Lapster 5 pin mini usb cable, usb b cable,camera cable usb2.0 for External HDDS/Card Readers/Camera etc.",
    "category": "Computers&Accessories|Accessories&Peripherals|Cables&Accessories|Cables|USBCable",
    "imageUrl": "https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/41ipWb8mrKL._SX300_SY300_QL70_FMwebp_.jpg",
    "description": "-mini usb cable is easy to plug and play connections with digital cameras , mobile phones, MP3 players, PDAs, External Hard Drives.|Compatibility with USB 1.0, 1.1 and 2.0.|This Camera cable transfer your pictures from your digital camera to your PC.|Connect a peripheral with a 5-Pin Mini-USB port to an USB Hub or USB port on PC|Warranty-1 year",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-10-03T15:16:37.829067Z",
    "updatedAt": "2025-10-11T17:13:00.829081Z"
  },
  {
    "name": "Portronics Konnect Spydr 31 3-in-1 Multi Functional Cable with 3.0A Output, Tangle Resistant, 1.2M Length, Nylon Braided(Zebra)",
    "category": "Computers&Accessories|Accessories&Peripherals|Cables&Accessories|Cables|USBCable",
    "imageUrl": "https://m.media-amazon.com/images/I/41LCWn4aUHL._SX300_SY300_QL70_FMwebp_.jpg",
    "description": "3.0A Output|PVC + Nylon Braided|Tangle Resistant|1.2M Length",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-07-11T11:41:23.829271Z",
    "updatedAt": "2025-10-07T05:20:30.829284Z"
  },
  {
    "name": "Belkin Apple Certified Lightning To Type C Cable, Tough Unbreakable Braided Fast Charging For Iphone, Ipad, Air Pods, 3.3 Feet (1 Meters)    White",
    "category": "Computers&Accessories|Accessories&Peripherals|Cables&Accessories|Cables|USBCable",
    "imageUrl": "https://m.media-amazon.com/images/W/WEBP_402378-T2/images/I/31fQdrBOMvL._SY445_SX342_QL70_FMwebp_.jpg",
    "description": "Charges Usb-Pd Enabled Iphones/Ipads From Zero To 50% When Paired With 18W Or Higher Usb-C Charger",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-08-15T22:11:37.829477Z",
    "updatedAt": "2025-11-01T10:28:03.829497Z"
  },
  {
    "name": "Remote Control Compatible for Amazon Fire Tv Stick Remote Control [ 3rd Gen ](Not Compatible for Fire TV Edition Smart TV) from basesailor",
    "category": "Electronics|HomeTheater,TV&Video|Accessories|RemoteControls",
    "imageUrl": "https://m.media-amazon.com/images/I/31-J+oOnb8L._SY300_SX300_.jpg",
    "description": "Compatible with Fire TV Stick Lite, Compatible with Fire TV Stick (2nd Gen and later),Compatible with Fire TV Stick 4K,Compatible with Fire TV Cube (1st Gen and later), and Compatible with Amazon Fire TV (3rd Gen, Pendant Design).|Control your compatible TV, Compatible with soundbar, and receiver with dedicated power, volume, and mute buttons.|Not compatible with Fire TV Stick (1st Gen), or Fire TV Edition smart TVs.|Just press and ask Alexa to easily find, launch, and control content.|Get to your favorite content quickly with preset app buttons for Prime Video, Netflix and Amazon Music.",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-05-18T09:01:26.829650Z",
    "updatedAt": "2025-10-19T01:13:02.829664Z"
  },
  {
    "name": "VW 80 cm (32 inches) Playwall Frameless Series HD Ready Android Smart LED TV VW3251 (Black)",
    "category": "Electronics|HomeTheater,TV&Video|Televisions|SmartTelevisions",
    "imageUrl": "https://m.media-amazon.com/images/I/41P2TNMG-hL._SY300_SX300_QL70_FMwebp_.jpg",
    "description": "Resolution: HD Ready (1366 X 768) | Refresh Rate: 60 Hertz | Viewing Angle: 178 Degrees|Connectivity: HDMI Ports to connect Set-Top Box | Blu Ray players | Gaming Console | USB Ports to connect Hard Drives & other USB devices|Sound: 20 Watts Output | Power Audio | Music Equalizer|Smart TV Features: Built-in Wi-Fi | Screen Mirroring | M-Cast | Video Streaming | Multimedia Connectivity | PC Connectivity|Display: A+ Grade Panel | IPE Technology | True Colour | Frameless Design|Warranty Information : 1 year warranty provided by the manufacturer from date of purchase|Installation: For requesting installation/wall mounting/demo of this product once delivered, please directly call Visio World support on (Please visit brand website for tollfree numbers) and provide product's model name as well as seller's details mentioned on the invoice|Easy Returns: This product is eligible for replacement within 10 days of delivery in case of any product defects, damage or features not matching the descript",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-10-25T15:45:09.829821Z",
    "updatedAt": "2025-10-28T16:06:37.829834Z"
  },
  {
    "name": "Hisense 108 cm (43 inches) 4K Ultra HD Smart Certified Android LED TV 43A6GE (Black)",
    "category": "Electronics|HomeTheater,TV&Video|Televisions|SmartTelevisions",
    "imageUrl": "https://m.media-amazon.com/images/I/51Pu9zNUbtL._SY300_SX300_QL70_FMwebp_.jpg",
    "description": "Resolution: 4K Ultra HD (3840x2160) | Refresh Rate: 60 Hertz|Connectivity: 3 HDMI ports to connect set top box, gaming console etc | 2 USB ports to connect hard drives and other USB devices | Bluetooth | Chromecast Built-in | 5G Wi-Fi | Stylish Voice Remote|Sound : 24 Watts Output | Dolby Atmos | Multi Channel Surround Sound for best sound experience | Powerful Sound|Smart TV Features: Official Android TV 9.0 PIE | Built-in Assistant | RAM: 2GB | ROM 16 GB | Quad Core | Search| Netflix | Prime Video | Disney+ Hotstar etc on Official Play Store|Display: Dolby Vision HDR | Ultra Dimming | UHD AI Upscaler | HDR 10, HLG support | Near Bezel-Less, Ultra Slim Design|Warranty Information: 2 Year Comprehensive Warranty on product provided by Hisense from date of purchase.|Installation: For requesting installation/wall mounting/demo of this product once delivered, please directly call Hisense Support for assistance (Please visit Hisense Website for Toll Free Numbers) and provide product's model",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-10-29T06:23:44.830022Z",
    "updatedAt": "2025-10-23T15:13:54.830036Z"
  },
  {
    "name": "Redmi 126 cm (50 inches) 4K Ultra HD Android Smart LED TV X50 | L50M6-RA (Black)",
    "category": "Electronics|HomeTheater,TV&Video|Televisions|SmartTelevisions",
    "imageUrl": "https://m.media-amazon.com/images/I/41Om+JyC4iL._SX300_SY300_.jpg",
    "description": "Resolution: 4K Ultra HD (3840 x 2160) | Refresh Rate: 60Hz | Viewing angle : 178 Degree|Connectivity: Dual-band Wi-Fi | Bluetooth 5.0 | 3 HDMI ports to connect latest gaming consoles, set top box, Blu-ray Players | 2 USB ports to connect hard drives and other USB devices | eARC - Dolby Atmos Passthrough eARC HDMI port | Optical Port|Sound: 30 Watts Output | Dolby Audio | DTS Virtual: X | Dolby Atmos pass through eARC | DTS-HD|Smart TV Features : Android TV 10 | PatchWall - Kids Mode with Parental Lock | Smart Curation | Universal search | Language Universe | India's Top 10 | Okay Google | Chromecast| Suporting Apps : Netflix, Prime Video, Disney+ Hotstar, 2.4GHz/5GHz Wi-Fi 802.11 a/b/g/n/ac (2x2 MIMO)|Display: 4K LED Panel | Dolby Vision | HDR10+ | HLG | Reality Flow | Vivid Picture Engine|Warranty Information: 1 year comprehensive warranty on product and 1 year additional on Panel provided by the brand from the date of purchase|Easy Returns: This product is eligible for replacement wi",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-10-11T22:20:43.830195Z",
    "updatedAt": "2025-10-26T15:20:42.830208Z"
  },
  {
    "name": "AmazonBasics 6-Feet DisplayPort (not USB port) to HDMI Cable Black",
    "category": "Electronics|HomeTheater,TV&Video|Accessories|Cables|HDMICables",
    "imageUrl": "https://m.media-amazon.com/images/I/41F6ukNxcCL._SX300_SY300_QL70_FMwebp_.jpg",
    "description": "DisplayPort male to HDMI male cable allows you to connect a DisplayPort output to an HDMI input|Connect your TV, projector or monitor; Not compatible with a USB port|Allows both the video and audio signals to transmit over a single cable|1 year limited warranty",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-06-18T18:32:14.830368Z",
    "updatedAt": "2025-10-20T23:19:05.830381Z"
  },
  {
    "name": "AmazonBasics 3 Feet High Speed HDMI Male to Female 2.0 Extension Cable",
    "category": "Electronics|HomeTheater,TV&Video|Accessories|Cables|HDMICables",
    "imageUrl": "https://m.media-amazon.com/images/I/41Rg-JkRGgL._SY300_SX300_QL70_FMwebp_.jpg",
    "description": "Supports full 1080p HD viewing with digital transfer at rates up to 102Gbps - for excellent picture quality|24k gold plated connectors with braided cable core to further enhance picture quality|1 year limited warranty",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-07-10T22:18:46.830557Z",
    "updatedAt": "2025-10-07T08:09:08.830574Z"
  },
  {
    "name": "iFFALCON 80 cm (32 inches) HD Ready Smart LED TV\u00a032F53 (Black)",
    "category": "Electronics|HomeTheater,TV&Video|Televisions|SmartTelevisions",
    "imageUrl": "https://m.media-amazon.com/images/I/51O93lUTxtL._SY300_SX300_QL70_FMwebp_.jpg",
    "description": "Resolution: HD Ready (1366 x 768) | Refresh Rate: 60 hertz|Connectivity: 2 HDMI Ports to connect set top box | 1 USB ports to connect hard drives or other USB devices | IR Port to control connected devices like DVD / STB Players|Sound: 16 Watts Output | Powerful Speakers with Dolby Audio|Smart TV Features : Android R 11 |1 GB RAM | 8 GB ROM | Packed with amazing smart features such as Google Voice Search, Google App Store and Built-in Chromecast. Google Play Store, YouTube, Google cast, Netflix.|Display: A+ Grade Panel | 178 Degree Wide Viewing Angle | HDR|Warranty Information: 1 Year warranty provided by the manufacturer from date of purchase|Installation: For Installation, Wall Mounting, Demo Of This Product Once Delivered,The wall mount is not included in the box and will be chargeable. Directly Contact_Us And Provide Product's Model Name And Seller's Details Mentioned On Your Invoice. The Service Center Will Allot You A Convenient Slot For The Service",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-05-10T14:08:33.830731Z",
    "updatedAt": "2025-10-08T15:22:32.830744Z"
  },
  {
    "name": "7SEVEN\u00ae Compatible Lg Smart Tv Remote Suitable for Any LG LED OLED LCD UHD Plasma Android Television and AKB75095303 replacement of Original Lg Tv Remote Control",
    "category": "Electronics|HomeTheater,TV&Video|Accessories|RemoteControls",
    "imageUrl": "https://m.media-amazon.com/images/I/31Bfu6liMWL._SX300_SY300_QL70_FMwebp_.jpg",
    "description": "Best Compatible Remote Control for LG television Models are AKB75095304 AKB75095305 AKB75095306 AKB75095307 AKB75095308|Hot Keys: NETFLIX, AMAZON Prime Video, 3D, Movies, Record, Live TV|This is a manufacturer substitution. Part may differ in appearance but is a functional equivalent to Original Part .Imported Generic Product. Best Substitute for your Original remote. Before Use Please Use New AAA Alkaline Battery|It's Universal Remote Control for all models of LG Television|All Products are checked by Testing machine Before Shipment.",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-05-23T17:49:06.830868Z",
    "updatedAt": "2025-10-19T13:41:18.830880Z"
  },
  {
    "name": "AmazonBasics 3.5mm to 2-Male RCA Adapter Cable For Tablet, Smartphone (Black, 15 feet)",
    "category": "Electronics|HomeTheater,TV&Video|Accessories|Cables|RCACables",
    "imageUrl": "https://m.media-amazon.com/images/I/513rqzxlDpL._SX300_SY300_QL70_FMwebp_.jpg",
    "description": "Adapter cable connects a smartphone, tablet, or MP3 player to a speaker, stereo receiver, or other RCA-enabled device|3.5mm Male connector on one end and two Male RCA connectors on the other end|Works with left and right audio input and devices with a standard 3.5mm auxiliary jack (typically used for headphones or ear buds)|Dual-shielding, polished metal connectors and a corrosion-resistant gold-plated 3.5mm connector for pure, clear audio and minimal signal loss|Beveled step-down design ensures a secure, fully plugged-in connection; PVC exterior offers added strength and flexibility;",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-09-11T13:18:51.830999Z",
    "updatedAt": "2025-11-03T00:49:11.831009Z"
  },
  {
    "name": "Acer 109 cm (43 inches) I Series 4K Ultra HD Android Smart LED TV AR43AR2851UDFL (Black)",
    "category": "Electronics|HomeTheater,TV&Video|Televisions|SmartTelevisions",
    "imageUrl": "https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/417QOjrqyBL._SY300_SX300_QL70_FMwebp_.jpg",
    "description": "Resolution : 4K Ultra HD (3840x2160) | Refresh Rate : 60 Hertz | 178 Degree wide viewing angle|Connectivity: Dual band Wifi | 2 way Bluetooth | HDMI ports 2.1 x 3 (HDMI 1 supports eARC) to connect personal computer, laptop, set top box, Blu-ray speakers or a gaming console | USB ports 2.0 x 1, 3.0 x 1 to connect hard drives or other USB device|Sound: 30 Watts Output | High Fidelity Speakers with Dolby Audio | 5 Sound Modes - Movie, Music, Standard, News, Sports|Smart Tv Features: Google certified Android TV 11 | Google Assistant | Chromecast built-in | Voice controlled Smart Remote | Hotkeys for Quick Access - Netflix, Prime Video, YouTube, Disney+Hotstar | 5 Picture Mode | 2GB RAM | 16GB Storage | 64bit Quad Core Processor|Display : 1.07 Billion colours | MEMC | Wide Colour Gamut+ | Intelligent Frame Stabilization Engine | Dynamic Signal Calibration | HDR10+ with HLG | UHD Upscaling | Super Brightness | Micro Dimming | Blue Light Reduction | 178 degree Wide viewing angle|Warranty Info",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-05-13T10:47:51.831127Z",
    "updatedAt": "2025-10-13T14:55:13.831138Z"
  },
  {
    "name": "Wayona Usb Type C 65W 6Ft/2M Long Fast Charging Cable Compatible For Samsung S22 S20 Fe S21 Ultra A33 A53 A01 A73 A70 A51 M33 M53 M51 M31(2M, Black)",
    "category": "Computers&Accessories|Accessories&Peripherals|Cables&Accessories|Cables|USBCable",
    "imageUrl": "https://m.media-amazon.com/images/I/41Rd-jDNOmL._SY445_SX342_QL70_FMwebp_.jpg",
    "description": "\u3010NOTE before purchase\u3011: This is a USB C to USB C cable, which means it has the same USB C plug on both ends, please be aware that this is not a USB C to USB A cable. Besides, you may need a USB C wall charger to charge your device.|\u301065W High Speed Charging\u3011: Output power up to 20V 3.25A, which is ensured by high-speed safe charging, and the USB 2.0 supports data transfer speed can reach 40~60MB/S (480Mbps). NOTE: This product DO NOT support video output and monitor connection.|\u3010Compatibility List\u3011: This USB C to USB C 2M/6ft cable compatible with Samsung Galaxy S21 S21+ / S20 S20+ S20 Ultra Note10/Note 10 Plus,S20, S21 Ultra, iPad Air 2020 10.9\u2018\u2019 (Gen 4), iPad Pro 12.9'' Gen3 (2018) , iPad Pro 11'' (2018), Nexus 6P/5X , Compatible with Macbook with the original charger (View Product Description for details)|\u3010Military grade material\u3011: Strong military fiber, the most flexible, powerful and durable material, makes tensile force increased by 200%. Special Strain Relief design, can bear 100",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-10-12T13:58:31.831257Z",
    "updatedAt": "2025-10-24T10:06:44.831268Z"
  },
  {
    "name": "Saifsmart Outlet Wall Mount Hanger Holder for Dot 3rd Gen, Compact Bracket Case Plug and Built-in Cable Management for Kitchen Bathroom, Bedroom (Black)",
    "category": "Electronics|HomeAudio|Accessories|SpeakerAccessories|Mounts",
    "imageUrl": "https://m.media-amazon.com/images/W/WEBP_402378-T2/images/I/41-AORr2udL._SX300_SY300_QL70_FMwebp_.jpg",
    "description": "Hand Free",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-05-23T20:11:39.831389Z",
    "updatedAt": "2025-10-27T20:44:38.831399Z"
  },
  {
    "name": "MI 2-in-1 USB Type C Cable (Micro USB to Type C) 30cm for Smartphone, Headphone, Laptop (White)",
    "category": "Computers&Accessories|Accessories&Peripherals|Cables&Accessories|Cables|USBCable",
    "imageUrl": "https://m.media-amazon.com/images/I/21fnxCjCF1L._SX300_SY300_QL70_FMwebp_.jpg",
    "description": "Fast Charging and Data Transfer|High Quality Design",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-08-07T15:46:59.831540Z",
    "updatedAt": "2025-10-08T07:06:07.831553Z"
  },
  {
    "name": "AmazonBasics New Release ABS USB-A to Lightning Cable Cord, Fast Charging MFi Certified Charger for Apple iPhone, iPad Tablet (3-Ft, White)",
    "category": "Computers&Accessories|Accessories&Peripherals|Cables&Accessories|Cables|USBCable",
    "imageUrl": "https://m.media-amazon.com/images/I/31R8-XSK40L._SX342_SY445_QL70_FMwebp_.jpg",
    "description": "Added Protection: An Additional Layer Of Protection Has Been Added To The Lightning And Usb Ends To Improve Durability And Reduce Fraying;",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-07-03T04:22:34.831682Z",
    "updatedAt": "2025-10-22T21:54:43.831692Z"
  },
  {
    "name": "LG 108 cm (43 inches) 4K Ultra HD Smart LED TV 43UQ7500PSF (Ceramic Black)",
    "category": "Electronics|HomeTheater,TV&Video|Televisions|SmartTelevisions",
    "imageUrl": "https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/51dOjIreG4L._SX300_SY300_QL70_FMwebp_.jpg",
    "description": "Resolution: 4K Ultra HD (3840x2160) | Refresh Rate: 60 hertz|Connectivity: Wi-Fi (Built-in) | 3 HDMI ports to connect set top box, Blu Ray players, gaming console | 1 USB ports to connect hard drives and other USB devices | eARC | Bluetooth 5.0 | Optical | Ethernet|Sound: 20 Watts Output | 2.0 Ch Speaker | AI Sound (Virtual Surround 5.1 up-mix) | Auto Volume Levelling | Bluetooth Surround Ready|Smart TV Features: AI ThinQ & WebOS 22 with User Profiles | Game Optimizer & Dashboard | \u03b15 Gen5 AI Processor 4K | Unlimited OTT App Support: Netflix, Prime Video, Disney+ Hotstar, Apple TV, SonyLIV, Discovery+, Zee5 | ALLM & HGiG Mode | HDR 10 Pro & Active HDR|Display: 4K Ultra HD LED Display | 4K Upscaler | AI Brightness Control|Warranty Information: 1 Year LG India Comprehensive Warranty and additional 1 year Warranty is applicable on panel/module from the date of purchase|Installation : For requesting installation/wall mounting/demo of this product once delivered, please directly call LG sup",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-07-12T19:42:39.831812Z",
    "updatedAt": "2025-10-15T06:54:20.831823Z"
  },
  {
    "name": "pTron Solero 331 3.4Amps Multifunction Fast Charging Cable, 3-in-1 USB Cable Micro USB/Type-C/iOS, Made in India, Durable & Strong & Tangle-free 118cm in Length (Black)",
    "category": "Computers&Accessories|Accessories&Peripherals|Cables&Accessories|Cables|USBCable",
    "imageUrl": "https://m.media-amazon.com/images/I/41gUqtvpULL._SX300_SY300_QL70_FMwebp_.jpg",
    "description": "Fast Charging - All combined 3-in-1 USB cable supports fast charging with a speed of up to 3.4Amps to all your gadgets including smartphones, tablets, Bluetooth speakers, and much more.|Wide Compatibility - Solero 331 universal fast charging cable can Simultaneously Charge Android, iOs & Type-C devices. Proudly Made in India.|Ultra Durable USB Cable - The cable is crafted with a thick PVC jacket giving you an extra tough cable with 10000+ bends lifespan cycle. It can easily handle daily wear and tear.|Convenient Length - This multi-pin USB cable comes with an ideal length of 118cm which eliminates the struggle of finding nearby switchboards.|6 months manufacturer warranty from the date of purchase on manufacturing defects only. Please note this cable is only for charging and does not support data transfer.",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-10-01T20:53:24.831942Z",
    "updatedAt": "2025-10-14T09:43:55.831953Z"
  },
  {
    "name": "10k 8k 4k HDMI Cable, Certified 48Gbps 1ms Ultra High Speed HDMI 2.1 Cable 4k 120Hz 144Hz 2k 165Hz 8k 60Hz Dynamic HDR ARC eARC DTS:X Compatible for Mac Gaming PC Soundbar TV Monitor Laptop PS5 4 Xbox",
    "category": "Electronics|HomeTheater,TV&Video|Accessories|Cables|HDMICables",
    "imageUrl": "https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/41+AJMzMo7L._SX342_SY445_.jpg",
    "description": "Certified HDMI Cable: The package has an official HDMI certification label. HDMI Officially Certified Fully compliant with the HDMI Forum\u2019s strict requirements as specified in HDMI.|It supports the latest features: 1ms, low EMI, SBTM, 48Gbps Bandwidth, ALLM, VRR, QMS, QFT, Dynamic HDR, HDR10, CEC, HDCP 2.2 & 2.3, VESA DSC 1.2a.|Resolution & Deep Color: 10k@60Hz 12-bit, 8K@60Hz 12-bit, 5k@120Hz 90Hz 12-bit, 4K@120Hz 144Hz 12-bit, 2k@240H 165Hz,1080p@240Hz, 720p, 480p.|Digital Audio Video Format Support: The latest high-bitrate audio formats are supported including eARC, ARC, DTS Master, DTS:X, Dol-by TrueHD, Dol-by Vision, Dol-by Atmos and more.|Wide Compatibility: Gaming PC, FreeSync, G-SYNC, All GeForce RTX 30 series, Soundbar, PS5 4, Xbox Series X, Xbox Series S, All Apple TV+, All OLED TV, 2021 Macbook Pro, laptop, Projector, Monitor, Fire TV, SHIELD TV.",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-10-12T18:39:44.832087Z",
    "updatedAt": "2025-10-23T22:27:01.832096Z"
  },
  {
    "name": "LRIPL Compatible Sony Bravia LCD/led Remote Works with Almost All Sony led/LCD tv's",
    "category": "Electronics|HomeTheater,TV&Video|Accessories|RemoteControls",
    "imageUrl": "https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/41hpz9rFbZL._SX300_SY300_QL70_FMwebp_.jpg",
    "description": "Before Order Please Match Your Remote With Image Shown|Compatible Sony Bravia LED/LCD Remote|Easy to use|Soft Rubber Keypad|Best Quality Plastic Body",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-10-08T06:56:21.832246Z",
    "updatedAt": "2025-10-27T04:17:48.832257Z"
  },
  {
    "name": "boAt Type-c A400 Type-c to USB A Cable for All Type C Phones (Lg nexus 5x), 1Mtr(Black)",
    "category": "Computers&Accessories|Accessories&Peripherals|Cables&Accessories|Cables|USBCable",
    "imageUrl": "https://m.media-amazon.com/images/I/41alINWQKXL._SX300_SY300_QL70_FMwebp_.jpg",
    "description": "Support The Maximum 3A Fast Charging And The Speed Of Data Sync Up To 480 Mbps|One End Normal Usb Type A And Other End Usb Type C|Aesthetically Designed, Aluminium Ends, With High-Density Boat'S Premium Nylon Braiding Wrapped Around The Entire Length Of The Tangle Free Cable For Reinforcement And Added Durability|Special Reversible Type-C To Usb A Male User-Friendly Design Helps You Insert The Connector In A Right Way All The Time|2 years warranty from the date of purchase",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-10-09T03:09:42.832419Z",
    "updatedAt": "2025-10-22T21:37:04.832433Z"
  },
  {
    "name": "Zoul Type C to Type C Fast Charging Cable 65W 2M/6ft USB C Nylon Braided Cord Compatible with MacBook Oneplus 9 9R Samsung Galaxy S21 Ultra S20+ (2M, Black)",
    "category": "Computers&Accessories|Accessories&Peripherals|Cables&Accessories|Cables|USBCable",
    "imageUrl": "https://m.media-amazon.com/images/I/41wI9GGhTHL._SX300_SY300_QL70_FMwebp_.jpg",
    "description": "\u3010NOTE before purchase\u3011:This is a USB C to USB C cable, which means it has the same USB C connector on both ends, please be aware that this is not a USB C to USB A cable. So, you may need a USB C wall charger to charge your device.|\u3010Fast Charging & 480Mbps Data Transfer Speed\u3011: Supports QC/PD fast charging, with 65W/30W/18W USB C Power Adapters to use. Data transfer speed is up to 480Mbps between two devices, which means transferring 100 songs within seconds.|\u3010Durable Nylon Braiding\u3011:The strong braided cable not only avoids the tangling but it also comes with Velcro strap so It can be wrapped up and put in a bag or pocket.|\u301065W / 3.25A Rapid Charging\u3011 \uff1a Built-in Emark smart chip, which makes this USB C to USB C PD cable strong enough to support max 3.25A current 65W power through, as well as support fast charging for more phones, like Macbook Pro 2018, Pixel 2 XL, Samsung Galaxy S20,Note 10,Nexus 5X/6P and more Type-C devices. You need a USB C wall charger to charge your device.|\u3010List o",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-07-15T10:51:23.832562Z",
    "updatedAt": "2025-10-22T10:41:48.832573Z"
  },
  {
    "name": "TP-LINK AC1300 Archer T3U Plus High Gain USB 3.0 Wi-Fi Dongle, Wireless Dual Band MU-MIMO WiFi Adapter with High Gain Antenna, Supports Windows 11/10/8.1/8/7/XP/MacOS",
    "category": "Computers&Accessories|NetworkingDevices|NetworkAdapters|WirelessUSBAdapters",
    "imageUrl": "https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/21jLkYGoSEL._SX300_SY300_QL70_FMwebp_.jpg",
    "description": "AC1300 Lightning-Fast Speed\u00a0\u2014 AC1300 (867 Mbps on the 5 GHz band or 400 Mbps on the 2.4 GHz band) dual-band Wi-Fi to ensure all your devices run at full speed|MU-MIMO Technology\u00a0\u2014 Improves the throughput and efficiency of the whole network with MU-MIMO technology|Dual-Band Wireless\u00a0\u2014 The 2.4 GHz and 5 GHz bands provide flexible connectivity, giving your devices access to the latest dual-band Wi-Fi router for faster speed and extended range|High-Gain Antennas\u00a0\u2014 Advanced external high-gain antennas greatly enhance the reception and transmission signal strength of the USB adapter|Supports the Latest Operating Systems\u00a0\u2014 Fully compatible with Windows 11/10/8.1/8/7/XP and\u00a0Mac OS 10.15 and earlier|In an unlikely case of product quality related issue, we may ask you to reach out to brand\u2019s customer service support and seek resolution. We will require brand proof of issue to process replacement request.",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-07-04T21:27:31.832759Z",
    "updatedAt": "2025-10-22T00:53:59.832774Z"
  },
  {
    "name": "LRIPL Mi Remote Control with Netflix & Prime Video Button Compatible for Mi 4X LED Android Smart TV 4A Remote Control (32\"/43\") with Voice Command (Pairing Required)",
    "category": "Electronics|HomeTheater,TV&Video|Accessories|RemoteControls",
    "imageUrl": "https://m.media-amazon.com/images/I/21yP58lKDoL._SX300_SY300_QL70_FMwebp_.jpg",
    "description": "This Voice Command Compatible Remote is for Mi LED Smart TV 4A (32\"/43\") Remote Control with NetFlix and YouTube Feature.|!!Before you complete your purchase, Please make sure your old remote image matches with this remote in terms of buttons and features!! IF Your old Remote is not Voice Control, This remote will be not work.|Soft key, lightweight design, Superior Quality remote for your Mi Smart Android TV 4A . Perfectly replaces your damage or old one and covers all the functions of the original remote.|Best Quality Replacement Remote Control for Mi Smart TV with Bluetooth Voice Command. Pairing Required with TV.|Long Range & Better Response.Remotes are checked by Testing Machine Before Shipment. Please use new Alkaline Batteries.(Not Included)",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-09-07T05:00:47.832934Z",
    "updatedAt": "2025-10-13T01:31:23.832948Z"
  },
  {
    "name": "TP-Link Nano USB WiFi Dongle 150Mbps High Gain Wireless Network Wi-Fi Adapter for PC Desktop and Laptops, Supports Windows 10/8.1/8/7/XP, Linux, Mac OS X (TL-WN722N)",
    "category": "Computers&Accessories|NetworkingDevices|NetworkAdapters|WirelessUSBAdapters",
    "imageUrl": "https://m.media-amazon.com/images/I/31Wb+A3VVdL._SY300_SX300_.jpg",
    "description": "150 Mbps Wi-Fi \u2014\u2014 Exceptional wireless speed up to 150Mbps brings best experience for video streaming or internet calls|Easy Set up \u2014\u2014 Easy wireless security encryption at a push of the WPS button|Antenna \u2014\u2014 4dBi detachable Omni Directional antenna, remarkably strengthen signal power of the USB adapter|Compatibility \u2014\u2014 Windows 11/10/8.1/8/7/XP, Mac OS 10.15 and earlier, Linux|Interface \u2014\u2014 USB 2.0|In an unlikely case of product quality related issue, we may ask you to reach out to brand\u2019s customer service support and seek resolution. We will require brand proof of issue to process replacement request.",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-08-03T10:33:58.833074Z",
    "updatedAt": "2025-10-12T20:26:52.833085Z"
  },
  {
    "name": "Kodak 80 cm (32 inches) HD Ready Certified Android LED TV 32HDX7XPRO (Black)",
    "category": "Electronics|HomeTheater,TV&Video|Televisions|SmartTelevisions",
    "imageUrl": "https://m.media-amazon.com/images/I/41ZptRPWCPL._SY300_SX300_QL70_FMwebp_.jpg",
    "description": "Resolution: HD Ready (1366 x 768) | Refresh Rate: 60 hertz|Connectivity: 3 HDMI ports to connect set top box, Blu Ray players, gaming console | 2 USB ports to connect hard drives and other USB devices|Sound output: 24 Watts Output|Smart TV Features: Android TV | Voice Search | Google Play | Chromecast | Prime Video|Display : A+ Grade Panel | Superior Sleek | Slim and stylish design|Warranty Information: 1 year standard manufacturer warranty by Kodak from the date of Purchase|Easy returns: This product is eligible for replacement within 10 days of delivery in case of any product defects, damage or features not matching the description provided|Country of Origin: India",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-08-16T00:04:38.833255Z",
    "updatedAt": "2025-10-08T16:15:51.833266Z"
  },
  {
    "name": "Airtel DigitalTV DTH Remote SD/HD/HD Recording Compatible for Television (Shining Black )",
    "category": "Electronics|HomeTheater,TV&Video|Accessories|RemoteControls",
    "imageUrl": "https://m.media-amazon.com/images/W/WEBP_402378-T2/images/I/41R3n7+taUL._SY300_SX300_.jpg",
    "description": "Compatible with SD and HD Recording",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-11-02T05:38:03.833395Z",
    "updatedAt": "2025-10-27T01:14:30.833406Z"
  },
  {
    "name": "AmazonBasics New Release Nylon USB-A to Lightning Cable Cord, MFi Certified Charger for Apple iPhone, iPad, Silver, 6-Ft",
    "category": "Computers&Accessories|Accessories&Peripherals|Cables&Accessories|Cables|USBCable",
    "imageUrl": "https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/31OIv762uSL._SX300_SY300_QL70_FMwebp_.jpg",
    "description": "Added Protection: An additional layer of protection has been added to the Lightning and USB ends to improve durability and reduce fraying;",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-06-25T04:22:36.833559Z",
    "updatedAt": "2025-10-31T15:15:51.833570Z"
  },
  {
    "name": "Ambrane Fast 100W Output Cable with Type-C to Type-C for Mobile, Laptop, Macbook & Table Charging, 480mbps Data Sync Speed, Braided Cable, 1.5m Length (ABCC-100, Black-Grey)",
    "category": "Computers&Accessories|Accessories&Peripherals|Cables&Accessories|Cables|USBCable",
    "imageUrl": "https://m.media-amazon.com/images/I/31y7uO5DU8L._SX300_SY300_QL70_FMwebp_.jpg",
    "description": "Stay ahead and never miss out with a 5A fast charging speed for your devices|It supports Power Delivery technology (PD) to keep your devices boosted up with power|Always stay ahead in the power league with a 100W power transfer|Its sturdy cord is tough enough to withstand 10000+ bends|Crafted for convenience, it allows you to charge and sync data with just one cable|It is widely compatible with all types of Type-C enabled devices and even laptops that have a Type-C port|We take pride in stating that this product is Made in India at our manufacturing facility in Haryana|It comes with a 6 months warranty against manufacturing defects. For any issue, please contact +91-11-45911111 or care@a",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-08-08T00:28:38.833685Z",
    "updatedAt": "2025-10-21T03:14:38.833696Z"
  },
  {
    "name": "BlueRigger Digital Optical Audio Toslink Cable (3.3 Feet / 1 Meter) With 8 Channel (7.1) Audio Support (for Home Theatre, Xbox, Playstation etc.)",
    "category": "Electronics|HomeTheater,TV&Video|Accessories|Cables|OpticalCables",
    "imageUrl": "https://m.media-amazon.com/images/I/41CF6GtnpKL._SX300_SY300_QL70_FMwebp_.jpg",
    "description": "Enables easy installation of audio components to your audio or home theater system|Digital optical cable constructed with durable black PVC outer layer and corrosion-resistant gold-plated connectors for optimal signal transfer|Precision-polished optical connectors allow maximum signal transfer accuracy. Specially optimized optical fiber for higher fidelity|Compatible with S/PDIF, ADAT's, Dolby Digital, & DTS",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-09-05T00:17:13.833914Z",
    "updatedAt": "2025-10-17T19:29:16.833934Z"
  },
  {
    "name": "Duracell Type-C To Micro 1.2M braided Sync & Charge Cable, USB C to Micro Fast Charge Compatible for fast data transmission (Black)",
    "category": "Computers&Accessories|Accessories&Peripherals|Cables&Accessories|Cables|USBCable",
    "imageUrl": "https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/41qhsp6qcNL._SX300_SY300_QL70_FMwebp_.jpg",
    "description": "1.2M Tangle Free durable tough braiding sync & charge cable|Supports Quick Charge 2.0 and 3.0, with max output up to 3A|Ensure fast and stable data transmission up to 480 Mbps|Up to 10,000+ bend and 10,000+ plugging and unplugging test ensure this cable a longer lifespan|Compatible Designed to work flawlessly with all Micro USB Or Type C devices of Mi, Xiaomi, Realme, IQOO, POCO, Android, Samsung, VIVO, OPPO, Oneplus, Redmi, tecno & Google Pixel etc.|2 Years Warranty",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-09-11T05:56:59.834148Z",
    "updatedAt": "2025-11-03T04:34:59.834171Z"
  },
  {
    "name": "VU 138 cm (55 inches) Premium Series 4K Ultra HD Smart IPS LED TV 55UT (Black)",
    "category": "Electronics|HomeTheater,TV&Video|Televisions|SmartTelevisions",
    "imageUrl": "https://m.media-amazon.com/images/I/41HhmJpfjNL._SX300_SY300_QL70_FMwebp_.jpg",
    "description": "Resolution: 4K (3840x2160) | Refresh Rate: 60 hertz | 178 Degree wide viewing angle|Connectivity: 3 HDMI ports to connect set top box, Blue Ray players | 2 USB ports to connect hard drives and other USB devices | 2.4/5GHz WiFi | HDMI CEC & ARC | 2-Way Bluetooth 5.0|Sound : 40-Watt Speakers | 2 Master + 2 Tweeter Speakers | Dolby Audio Sound Enhancement | Ultra Surround | Clear Voice III|Smart TV Features : webOS | Content Store | Magic Remote Control | ThinQ AI Voice Assistant | Alexa Built-in | Wireless Casting | Licensed Apps-Netflix, Prime Video Hotkeys on Remote|Display : IPS Panel | 4K HDR | 400nits Brightness | HDR10 | HLG | Auto Low Latency Mode (ALLM) | Game Mode | TruMotion | MEMC | Cricket Mode | Panoramic Viewing|Warranty Information: 1 year warranty provided by the manufacturer from date of purchase|Installation/Wall mounting/Demo will be arranged by AHS Team. For any other information, please contact VU support (Please visit brand website for tollfree numbers) and provide ",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-10-21T11:36:53.834334Z",
    "updatedAt": "2025-10-23T22:41:18.834345Z"
  },
  {
    "name": "Zoul USB Type C Fast Charging 3A Nylon Braided Data Cable Quick Charger Cable QC 3.0 for Samsung Galaxy M31s M30 S10 S9 S20 Plus, Note 10 9 8, A20e A40 A50 A70 (1M, Grey)",
    "category": "Computers&Accessories|Accessories&Peripherals|Cables&Accessories|Cables|USBCable",
    "imageUrl": "https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/419QKVTxaSL._SX300_SY300_QL70_FMwebp_.jpg",
    "description": "{3A/QC 3.0 FAST CHARGING and DATA SYNC} : This USB C cable supports QC 3.0 Fast Charging and Data Syncing, max current 3.0A and transfer speed up to 480Mbps. Built-in 56K pull-up resistor and strong metal connections provides reliable conductivity and stability.|{Nylon Braided Tangle-free Design} : Premium Nylon Braided Type C Cable/Lead adds additional durability and tangle free with a tested lifespan of 10000+ bending test.|{SAFE & RELIABLE} : High-purity copper wire features anti-oxidation and anti-rust, which will keep long-lasting fast charging performance. This Type c cable fast charging has safety certification, you have no need to worry about this cable quality at all.|{What You Get} : Premium Nylon Braided Cable 3FT(1M) and our friendly customer service.",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-09-09T01:08:01.834484Z",
    "updatedAt": "2025-10-04T17:54:00.834495Z"
  },
  {
    "name": "Samsung 80 cm (32 inches) Wondertainment Series HD Ready LED Smart TV UA32TE40AAKBXL (Titan Gray)",
    "category": "Electronics|HomeTheater,TV&Video|Televisions|SmartTelevisions",
    "imageUrl": "https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/41+b6inZEkL._SX300_SY300_.jpg",
    "description": "Resolution: HD Ready (1366x768) | Refresh Rate: 60 hertz|Connectivity: 2 HDMI ports to connect set top box, Blu Ray players, gaming console | 1 USB ports to connect hard drives and other USB devices|Sound : 20 Watts Output | Dolby Digital Plus|Smart TV Features : Voice Assistants | SmartThings App | Personal Computer | Home Cloud | Live Cast | Screen Share | Music System |Alexa Built-in: Voice control your TV and your day. Just ask Alexa to search for movies, play music, control smart home devices, get sports updates and more|Display : LED Panel | Mega Contrast | PurColor | HD Picture Quality | Slim & Stylish Design|Warranty Information: 1 year comprehensive warranty plus additional 1 years on panel by brand from date of invoice|Installation: TV Table stand is not included in the box with this model. customer may ask for Table Top Stand or Wall Mount which will be provided to the customer at the time of installation, please directly call Samsung support on [1800407267864 / 180057267864",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-05-29T15:01:59.834613Z",
    "updatedAt": "2025-10-10T21:45:09.834624Z"
  },
  {
    "name": "MI Xiaomi USB Type C HYperCharge Cable 6A 100cm Sturdy and Durable Black Supports 120W HyperCharging",
    "category": "Computers&Accessories|Accessories&Peripherals|Cables&Accessories|Cables|USBCable",
    "imageUrl": "https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/21WhHd9leXL._SX300_SY300_QL70_FMwebp_.jpg",
    "description": "Supports 120W Fast Charging|High Quality Design",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-09-03T13:51:52.834748Z",
    "updatedAt": "2025-10-10T22:42:19.834759Z"
  },
  {
    "name": "GENERIC Ultra-Mini Bluetooth CSR 4.0 USB Dongle Adapter for Windows Computer ( Black:Golden)",
    "category": "Computers&Accessories|NetworkingDevices|NetworkAdapters|WirelessUSBAdapters",
    "imageUrl": "https://m.media-amazon.com/images/I/41c5wGlZyPS._SX300_SY300_QL70_FMwebp_.jpg",
    "description": "Item design may vary as per stock availability.|Compatibility -Windows 10, Windows 8, Windows 7, XP, Vista ,2003, 2000,Me, Bluetooth-enabled devices, like iPhone, iPad, iPod,Samsung Galaxy,note ,smart phones, tablets, keyboards,headsets & more|CSR 4.0 Dongle -Support Bluetooth voice and date transmission|Country of Origin: China",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-07-13T22:52:07.834899Z",
    "updatedAt": "2025-10-17T14:21:29.834912Z"
  },
  {
    "name": "7SEVEN\u00ae Compatible for Tata Sky Remote Original Set Top\u00a0HD Box and Suitable for SD Tata Play setup Box Remote Control",
    "category": "Electronics|HomeTheater,TV&Video|Accessories|RemoteControls",
    "imageUrl": "https://m.media-amazon.com/images/W/WEBP_402378-T2/images/I/31IS376AeYL._SX300_SY300_QL70_FMwebp_.jpg",
    "description": "[Compatible] All model of dth SD / HD / HD+ Plus / 4K DTH Set Top Box.|[Plug & Play] This is a Universal dth Remote - Also Works with All LED LCD TV (Pairing Required in some models)|[Important] This remote doesn't have feature of recording key and respectively won't support for recording function|[Suggestion] For best performance, please insert new batteries before using (Batteries Not Included)|[Caution] This is an Imported Generic Product & Not Original Remote By TataSky.",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-09-11T00:19:41.835051Z",
    "updatedAt": "2025-10-23T14:09:03.835062Z"
  },
  {
    "name": "Belkin Apple Certified Lightning To Type C Cable, Fast Charging For Iphone, Ipad, Air Pods, 3.3 Feet (1 Meters)    White",
    "category": "Computers&Accessories|Accessories&Peripherals|Cables&Accessories|Cables|USBCable",
    "imageUrl": "https://m.media-amazon.com/images/W/WEBP_402378-T2/images/I/21fnuilweNL._SY445_SX342_QL70_FMwebp_.jpg",
    "description": "Lightning Speed Lightning Cable Connect Your Iphone Or Ipad To A Usb-C Fast Charger For A Quick Power Boost Or Sync Photos And Videos With Your Computer. With This Convenient 4-Foot Cable You Can Leverage The Latest Fast Charging Standard, Usb Power Delivery|Tested To Withstand 10,000+ Bends For Ultimate Longevity|Supports Usb Power Delivery Fast Charging Take Advantage Of The Fast Charge Feature On Your Iphone 8 Or Later??Charging Up To 50 Percent In 30 Minutes* When Paired With An 18W Or Higher Usb-C Power Adapter|Lightning To Usb-C Cable For Iphone Fast Charge Your Iphone 8 Or Later From 0-50% In 30 Minutes (When Paired With 18W Usb-Pd Charger) Fast Charge Compatible Iphone Models: Iphone 11, 11 Pro, 11 Pro Max, Xs, Xs Max, Xr, X, 8, 8 Plus Tested To Withstand 8,000+ Bends|The Belkin Difference: Pioneer In Technology And Innovation For Over 35 Years|Mfi Certified ??Made For Iphone\" And ??Made For Ipad\" Mean That An Electronic Accessory Has Been Designed To Connect Specifically To Ip",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-07-27T03:02:46.835182Z",
    "updatedAt": "2025-10-11T03:52:03.835194Z"
  },
  {
    "name": "EGate i9 Pro-Max 1080p Native Full HD Projector 4k Support | 3600 L (330 ANSI ) | 150\" (381 cm) Large Screen | VGA, AV, HDMI, SD Card, USB, Audio Out | (E03i31 / E04i32) Black",
    "category": "Electronics|HomeTheater,TV&Video|Projectors",
    "imageUrl": "https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/51DhRNtyo0L._SX300_SY300_QL70_FMwebp_.jpg",
    "description": "Display :BIGGER & BETTER - LED, HD Ready (1080p) | (1280 x 720) Native Resolution | 1500 : 1 High Contrast Ratio | 3.81 m (150 inch) Large Screen Display|Lumens: BRIGHTER - 3300 Lumen | 330 ANSI Lumen | LED- Life Long Lamp + 30000 Hours Life |16:9 Aspect Ratio. Power Consumption : 50 - 150 W|Connectivity : 2 x HDMI | USB | VGA | AV | SD Card Slot | Audio Out | Sound : In-Built Speaker (Stereo) | 3W Speaker|Connect - TV (Set Top Box), Fire TV Stick, PC/ Laptop, DVD, Play Station etc.|Warranty Information : 1 year warranty provided by the manufacturer from date of purchase",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-09-12T13:04:34.835335Z",
    "updatedAt": "2025-10-31T00:44:13.835362Z"
  },
  {
    "name": "ZEBRONICS HAA2021 HDMI version 2.1 cable with 8K @ 60Hz, 4K @ 120Hz, eARC & CEC support, 3D compatible, 2 meters length, 48Gbps max and Gold-plated connectors",
    "category": "Electronics|HomeTheater,TV&Video|Accessories|Cables|HDMICables",
    "imageUrl": "https://m.media-amazon.com/images/W/WEBP_402378-T2/images/I/31fpyR3mU4L._SX300_SY300_QL70_FMwebp_.jpg",
    "description": "Superior quality HDMI (Male - Male) cable with 2-meter length and gold plated connectors for durable and rust-free usage|Supporting 8K video resolution with 60Hz refresh rate and 4K video resolution with 120Hz refresh rate.|Latest HDMI version 2.1 with 48Gbps data transfer rate support for the most efficient & lossless data transfer.|Suitable for various input devices such as Smart TV, Computers, Laptops, PlayStation, Gaming console, HD TV boxes, etc|Compatible with Soundbars, Speakers, Audio systems, etc., with the HDMI eARC & HDMI ARC connectivity. Suitable for all Zebronics soundbars with and without Dolby Audio / Dolby Atmos.|eARC - Enhanced Audio return channel support for the most Efficient data transfer with the connected Soundbars and Audio systems to your Smart TV. DOLBY ATMOS and DOLBY AUDIO support with lossless transmission.|CEC extension support for controlling other compatible HDMI devices connected to the source / master device.",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-11-01T10:47:58.835649Z",
    "updatedAt": "2025-10-18T12:35:27.835665Z"
  },
  {
    "name": "7SEVEN\u00ae Compatible for Sony Bravia LCD LED UHD OLED QLED 4K Ultra HD TV remote control with YouTube and NETFLIX Hotkeys. Universal Replacement for Original Sony Smart Android tv Remote Control",
    "category": "Electronics|HomeTheater,TV&Video|Accessories|RemoteControls",
    "imageUrl": "https://m.media-amazon.com/images/I/31yHKPd+rsL._SY300_SX300_.jpg",
    "description": "1. Remote control suitable for sony tv LCD/ LED/ UHD TV smart controller with Youtube netflix button RMT-TX300E rmf-tx100e RMT-TX202P RMT-TX300P MT-TX300E RMT-TX300P compatible Remote for Sony TV KD-55X7000F KD-43X7000F KD-49X7000F KDL-43W660F KD-65X7000F KD-43X7000E KD-49X7000E KD-55X7000E KD-65X7000E KDL-40W660E KDL-49W660E|2. No programming required ! Just load new AAA batteries in and will works very well ! Please Match The Image With Your Existing Remote Before Placing the Order .All Products are checked by Testing machine Before Shipment. Imported Generic Product .Durable Quality, Rigid Body, and Efficient Performance increases Device life|3. Long Distance range, can be operated from any corner of the room. Ultra-wide angle . No exact pointing needed. Premium technology.|4. Durable Quality, Rigid Body, Efficient Performance increases Device life. Best Quality Plastic Body and Soft Rubber Keypad.|5. This is a manufacturer substitution. Part may differ in appearance but is a functi",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-07-16T05:41:59.835804Z",
    "updatedAt": "2025-10-27T22:08:13.835816Z"
  },
  {
    "name": "AmazonBasics Digital Optical Coax to Analog RCA Audio Converter Adapter with Fiber Cable",
    "category": "Electronics|HomeTheater,TV&Video|Accessories|Cables|OpticalCables",
    "imageUrl": "https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/41OrFRgZhYL._SX300_SY300_QL70_FMwebp_.jpg",
    "description": "Audio converter box that connects coaxial or toslink digital devices to analog RCA sources|Compatible with CD/DVD/Blu-ray players, computers, A/V receivers, digital TVs, and gaming devices, and more|Supports sampling rate at 32, 44.1, 48 and 96KHz; 24-bit S/PDIF incoming bit stream on left and right channels|Provides crystal clear electromagnetic noise-free transmission|Small, compact design that doesn\u2019t take up too much space behind your entertainment center or desk; simple to install|Includes quality fiber cable and external micro USB power supply",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-09-10T04:04:54.835977Z",
    "updatedAt": "2025-10-12T11:43:55.835992Z"
  },
  {
    "name": "Wayona Type C Cable Nylon Braided USB C QC 3.0 Fast Charging Short Power Bank Cable for Samsung Galaxy S10e/S10+/S10/S9/S9+/Note 9/S8/Note 8, LG G7 G5 G6, Moto G6 G7 (0.25M, Black)",
    "category": "Computers&Accessories|Accessories&Peripherals|Cables&Accessories|Cables|USBCable",
    "imageUrl": "https://m.media-amazon.com/images/I/41-NYo+m0JL._SY300_SX300_.jpg",
    "description": "\u2705\u3010Fast Charge & Data Sync\u3011: Fast charge& data transfer USB A to USB C, conforming to the USB Type C Specification version 1.1, 56kilohm, which ensure a safe charging at 4.8A Maximum. Charging and syncing 2 in 1, data transfer speed up to 480Mbps.|\u2705\u3010Extreme Durability\u3011: Over 10000 bending tests,This type c cable is far more durable than the same price, Premium nylon braided type c cable adds additional durability and tangle free.|\u2705\u3010Short and Convenient Design\u3011: The light and space-saving 1ft USB Type C cable, it\u2019s perfect for your power bank, the office desk, always keep your space tidy, super easy to carry and convenient for traveling, making your life more convenient.|\u2705\u3010Wide Compatibility\u3011: This USB A to USB C Charger Cable compatible with Samsung Galaxy S10e S10 S10 plus S9 S9 plus S8 S8 plus, Note 10 Note 10 plus Note9 note8, a40 a50 a70 a80 A3 A5 2017, Sony Xperia XZ3 XZ2 Premium XA2 XA1,XZ1, Moto G6 G6 plus G7 G7 power G7 play G7 plus Z Z2 Z3 X4, LG G8 G7 G6 G5 V40 V35 V30 V20, Go",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-10-22T14:19:29.836240Z",
    "updatedAt": "2025-10-04T19:50:55.836256Z"
  },
  {
    "name": "Pinnaclz Original Combo of 2 USB Type C Fast Charging Cable, USB C Data Cable for Charging and Data Transfer Smart Phones White 1.2 Meter Made in India (Pack of 2)",
    "category": "Computers&Accessories|Accessories&Peripherals|Cables&Accessories|Cables|USBCable",
    "imageUrl": "https://m.media-amazon.com/images/I/41agXfR4tqL._SX300_SY300_QL70_FMwebp_.jpg",
    "description": "[SYNC & CHARGE] : Ideal for charging and powering USB Type-C enabled devices, as well as syncing data, photos and music.|[REVERSIBLE] : Easily insert the Type C connector in a right way every time.|[SYNC DATA] : Transfer data at very high speeds.|[WARRANTY] : 6 Months hassle free warranty from the manufacturer.",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-10-21T12:59:43.836395Z",
    "updatedAt": "2025-10-30T21:50:53.836406Z"
  },
  {
    "name": "Ambrane BCL-15 Lightning Cable for Smartphone (1.5m Black)",
    "category": "Computers&Accessories|Accessories&Peripherals|Cables&Accessories|Cables|USBCable",
    "imageUrl": "https://m.media-amazon.com/images/W/WEBP_402378-T2/images/I/313Ja+mXy6L._SY300_SX300_.jpg",
    "description": "Upto 15W Fast Charging - Supports upto 15W fast charging and 480 Mbps data transfer speed.|Universal Compatibility - It is compatible with all lightning port enabled devices.|Unbreakable - Made of special braided outer with rugged interior bindings, it is an ultra-durable cable that won\u2019t be affected by daily rough usage.|Ideal Length - It has an ideal length of 1.5 meters which is super convenient to use.|Made in India - This product is made in India at the Ambrane\u2019s manufacturing facility in Haryana.",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-07-03T12:44:45.836576Z",
    "updatedAt": "2025-10-10T22:47:03.836587Z"
  },
  {
    "name": "Belkin USB C to USB-C Fast Charging Type C Cable, 60W PD, 3.3 feet (1 meter) for Laptop, Personal Computer, Tablet, Smartphone - Black, USB-IF Certified",
    "category": "Computers&Accessories|Accessories&Peripherals|Cables&Accessories|Cables|USBCable",
    "imageUrl": "https://m.media-amazon.com/images/I/21DUuehBaRL._SX300_SY300_QL70_FMwebp_.jpg",
    "description": "2-Year Manufacturing Warranty|Usb-If Certified So You Can Count On A Great Experience On Any Device|Use Them At Home, In Your Car, Or Anywhere You Need To Sync Music, Photos, Or Data And Charge Your Devices|Tested To Withstand 8, 000+ Bends, ** These Usb-C Fast Charge Cables Are Built With More Strength And Flexibility To Use Over And Over Again. This Makes Them Ideal For Easy Placement In Your Bag To Take On-The-Go|Get A Fast Charge, Up To 50% In Around 36 Minutes* With Sturdy Usb-C To Usb-C Cables",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-08-17T23:50:55.836775Z",
    "updatedAt": "2025-10-10T22:27:20.836786Z"
  },
  {
    "name": "LOHAYA Television Remote Compatible with Samsung Smart LED/LCD/HD TV Remote Control [ Compatible for All Samsung Tv Remote Control ]",
    "category": "Electronics|HomeTheater,TV&Video|Accessories|RemoteControls",
    "imageUrl": "https://m.media-amazon.com/images/I/31vPhcWqqWL._SX300_SY300_QL70_FMwebp_.jpg",
    "description": "Compatible Device For Samsung Smart LED/LCD/HD TV Remote Control|Compatible Models :- bn59-01301a bn59-00960a bn59-01175m aa59-00772a bn59-01259e bn59-01266abn59-01303a aa59 00403e aa59-00741a aa5900602a nu7100 m5570 bn59-01259b bn59-01198w bn59 aa59-00802a bn59-01253a bn59-01199n bn59-01274a aa59-00607a|Remotes are checked by Testing Machine Before Shipment|Imported Generic Product Not by Samsung|Please Match the Image with Your Existing Remote Before Placing the Order",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-08-11T14:00:10.836904Z",
    "updatedAt": "2025-10-12T20:42:47.836914Z"
  },
  {
    "name": "Wayona Nylon Braided Lightning USB Data Sync & 3A Charging Cable for iPhones, iPad Air, iPad Mini, iPod Nano and iPod Touch (3 FT Pack of 1, Grey)",
    "category": "Computers&Accessories|Accessories&Peripherals|Cables&Accessories|Cables|USBCable",
    "imageUrl": "https://m.media-amazon.com/images/I/41bkm5HhWsL._SY445_SX342_QL70_FMwebp_.jpg",
    "description": "[High Compatibility] : iPhones, iPad Air, iPad mini, iPod Nano and iPod Touch|[Fast Charge&Data Sync ] : It can charge and sync simultaneously at a rapid speed, Compatible with any charging adaptor, multi-port charging station or power bank.|[Durability] : Durable nylon braided design with premium aluminum housing and toughened nylon fiber wound tightly around the cord lending it superior durability and adding a bit to its flexibility.|[High Security Level ] : It is designed to fully protect your device from damaging excessive current.Copper core thick+Multilayer shielding, Anti-interference, Protective circuit equipment.|[WARRANTY] 12-months warranty and friendly customer services, ensures the long-time enjoyment of your purchase. If you meet any question or problem, please don't hesitate to contact us.",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-10-15T15:58:08.837086Z",
    "updatedAt": "2025-10-15T18:43:30.837108Z"
  },
  {
    "name": "Electvision Remote Control Compatible with Kodak/Thomson Smart led tv (Without Voice) Before Placing Order for verification Contact Our coustmer Care 7738090464",
    "category": "Electronics|HomeTheater,TV&Video|Accessories|RemoteControls",
    "imageUrl": "https://m.media-amazon.com/images/W/WEBP_402378-T2/images/I/311wFoZMekL._SX300_SY300_QL70_FMwebp_.jpg",
    "description": "*Please match your previous remote before placing order. or for verification of remote contact our coustmer care 7738090464|. * Its Electvision compatible remote for kodak LED.",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-08-09T15:03:12.837255Z",
    "updatedAt": "2025-10-14T20:49:47.837267Z"
  },
  {
    "name": "Acer 80 cm (32 inches) S Series HD Ready Android Smart LED TV AR32AR2841HDSB (Black)",
    "category": "Electronics|HomeTheater,TV&Video|Televisions|SmartTelevisions",
    "imageUrl": "https://m.media-amazon.com/images/I/51sUInS8MiL._SY300_SX300_QL70_FMwebp_.jpg",
    "description": "Resolution : HD Ready (1366 x 768) | Refresh Rate : 60 Hertz | 178 Degree wide viewing angle|Connectivity: 2 HDMI ports to connect latest gaming consoles, set top box, Blu-ray Players | 2 USB ports to connect hard drives and other USB devices | Bluetooth 5.0 | SPDIF | Ethernet | Headphone out|Sound: 40Watts Soundbar | Dolby Audio|Smart TV Features: Certified Android TV 11 | Google Assistant | Chromecast built-in | Voice controlled Smart Remote | Hotkeys for Quick Access - Netflix, Prime Video, YouTube, Disney+Hotstar | 5 Picture Mode | 1.5GB RAM | 8GB Storage | 64bit Quad Core Processor|Display: High Definition | HDR10+ | HLG | Intelligent Frame Stabilization Engine | Dynamic Signal Calibration | 16.7 Million Colours | WCG | Super Brightness | Micro Dimming | Blue Light Reduction | 178 Degree Wide Viewing Angle|Warranty Information: 1 years comprehensive warranty provided by the manufacturer from date of purchase|Installation: Installation/Wall mounting/demo will be arranged by AHS Tea",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-09-26T20:43:49.837388Z",
    "updatedAt": "2025-10-28T17:06:25.837399Z"
  },
  {
    "name": "realme 10W Fast Charging Micro-USB Cable (Braided, Black)",
    "category": "Computers&Accessories|Accessories&Peripherals|Cables&Accessories|Cables|USBCable",
    "imageUrl": "https://m.media-amazon.com/images/I/31Kt+OO7C6L._SY300_SX300_.jpg",
    "description": "realme's 10W Micro-USB Cable is compatible with both smartphones and tablets (running Android & having Micro-USB Input Port)|Ensures up to 2A fast charging and high data transmission rate|The premium Nylon braids makes it robust and sturdy against unwanted bends and damages|Cable Length - 1 meter|realme's 10W Micro-USB Cable is compatible with both smartphones and tablets (running Android & having Micro-USB Input Port)|Ensures up to 2A fast charging and high data transmission rate|The premium Nylon braids makes it robust and sturdy against unwanted bends and damages|Cable Length - 1 meter",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-06-21T03:06:07.837517Z",
    "updatedAt": "2025-10-21T06:39:28.837528Z"
  },
  {
    "name": "TP-Link AC1300 USB WiFi Adapter (Archer T3U) - 2.4G/5G Dual Band Mini Wireless Network Adapter for PC Desktop, MU-MIMO Wi-Fi Dongle, USB 3.0, Supports Windows 11,10, 8.1, 8, 7, XP/Mac OS 10.15 and earlier",
    "category": "Computers&Accessories|NetworkingDevices|NetworkAdapters|WirelessUSBAdapters",
    "imageUrl": "https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/31IdziegWVL._SX300_SY300_QL70_FMwebp_.jpg",
    "description": "Ultimate\u00a0Wi-Fi Speed\u00a0\u2014\u2014 AC1300 (400 Mpbs on 2.4GHz band and 867 Mbps on 5GHz band) wireless speed with the next generation Wi-Fi - 802.11ac|Dual Band Wireless\u00a0\u2014\u2014 2.4GHz and 5GHz band for flexible connectivity|Mini design\u00a0\u2014\u2014 Mini-sized design for convenient portability with a reliable high performance|Super Speed USB 3.0 Port \u2014\u2014 Up to 10x faster transfer speeds than USB 2.0|MU-MIMO\u00a0\u2014\u2014 Delivers highly efficient wireless connection|Supported Operating System\u00a0\u2014\u2014 Windows 11/10/8.1/8/7/XP, Mac OS 10.15 and earlier",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-08-18T09:43:37.837722Z",
    "updatedAt": "2025-10-19T19:52:01.837731Z"
  },
  {
    "name": "Acer 139 cm (55 inches) I Series 4K Ultra HD Android Smart LED TV AR55AR2851UDFL (Black)",
    "category": "Electronics|HomeTheater,TV&Video|Televisions|SmartTelevisions",
    "imageUrl": "https://m.media-amazon.com/images/W/WEBP_402378-T2/images/I/41ECCMs7tjL._SY300_SX300_QL70_FMwebp_.jpg",
    "description": "Resolution : 4K Ultra HD (3840x2160) | Refresh Rate : 60 Hertz | 178 Degree wide viewing angle|Connectivity: Dual band Wifi | 2 way Bluetooth | HDMI ports 2.1 x 3 (HDMI 1 supports eARC) to connect personal computer, laptop, set top box, Blu-ray speakers or a gaming console | USB ports 2.0 x 1, 3.0 x 1 to connect hard drives or other USB device|Sound: 30 Watts Output | High Fidelity Speakers with Dolby Audio | 5 Sound Modes - Movie, Music, Standard, News, Sports|Smart Tv Features: Google certified Android TV 11 | Google Assistant | Chromecast built-in | Voice controlled Smart Remote | Hotkeys for Quick Access - Netflix, Prime Video, YouTube, Disney+Hotstar | 5 Picture Mode | 2GB RAM | 16GB Storage | 64bit Quad Core Processor|Display : 1.07 Billion colours | MEMC | Wide Colour Gamut+ | Intelligent Frame Stabilization Engine | Dynamic Signal Calibration | HDR10+ with HLG | UHD Upscaling | Super Brightness | Micro Dimming | Blue Light Reduction | 178 degree Wide viewing angle|Warranty Info",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-09-12T03:34:38.837946Z",
    "updatedAt": "2025-10-16T19:20:25.837959Z"
  },
  {
    "name": "Ambrane 60W / 3A Fast Charging Output Cable with Micro to USB for Mobile, Neckband, True Wireless Earphone Charging, 480mbps Data Sync Speed, 1m Length (ACM - AZ1, Black)",
    "category": "Computers&Accessories|Accessories&Peripherals|Cables&Accessories|Cables|USBCable",
    "imageUrl": "https://m.media-amazon.com/images/W/WEBP_402378-T2/images/I/414P4JCZY-L._SX300_SY300_QL70_FMwebp_.jpg",
    "description": "Fast Charging Cable - The cable can support upto a charging speed of 3A making it the optimal for Quick Charge / Rapid Charge and Turbo Charge devices.|Durable Cable- Using only premium quality materials and a tough, durable PVC Coating, the Ambrane USB cable is built for connecting and disconnecting over and over again without signal loss.|High Speed Data Transfer- 480 Mbps data transfer speed allows you to sync the data to the computer or other USB devices within few seconds.|Genuine USB Connectors- We use only certified and high-quality connectors ensuring not only the safety of the connected device but also reliable charging and high-speed data transmission|Universal Compatibility - Cable is fully compatible with Android Devices, Tablets, Bluetooth speakers, cameras, camcorders etc. and any other device that charges through a Micro USB cable.",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-10-23T11:12:12.838102Z",
    "updatedAt": "2025-10-23T11:40:07.838121Z"
  },
  {
    "name": "Wayona USB Type C 65W Fast Charging 2M/6Ft Long Flash Charge Cable 3A QC 3.0 Data Cable Compatible with Samsung Galaxy S21 S10 S9 S8, iQOO Z3, Vivo, Note 10 9 8, A20e A40 A50 A70, Moto G7 G8 (2M, Grey)",
    "category": "Computers&Accessories|Accessories&Peripherals|Cables&Accessories|Cables|USBCable",
    "imageUrl": "https://m.media-amazon.com/images/I/416qO6VZHgL._SX300_SY300_QL70_FMwebp_.jpg",
    "description": "~ QC3.0 FAST CHARGING & DATA SYNC : This 2meter/3ft USB C cable support QC3.0 Fast Charging and Data Syncing, max current 3.0A and transfer speed up to 480Mbps. Built-in 56K pull-up resistor and strong metal connections provide outstandingly reliable conductivity and stability.|~ NYLON BRAIDED, EXTREME DURABILITY : With a tested 20000+ bend lifespan, usb c charging cable with heavy duty braided and strong metal connections is far more durable with best price for your long life charging use.|~ WIDELY COMPATIBILITY : Wayona usb type c charging cords with fast charge is Compatible with Samsung Galaxy S20 S20+ S20 Ultra S10e S10 Lite S10 S10+ S8 S8+ S9 S9+ Note 8 Note 9 Note 10, Samsung A8 A9 2018 M20 M21 M30 M31 M30s A20e A30 A40 A50 A70 A51 A71 A80 A90, Moto G8 G8+ G8 Power G8 Power Lite/ G7 G7 Plus G7 Power/G7 Play/G6/G6 plus, Sony Xperia XZ/XZ2 Premium L3 L4, HTC 10 U11+,Xiaomi and other USB type c devices.|~ MULTI-LENGTH (1M /2M) : We supply extra long USB type C charger cables. Much ",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-09-05T09:32:49.838279Z",
    "updatedAt": "2025-10-09T06:16:36.838291Z"
  },
  {
    "name": "Syncwire LTG to USB Cable for Fast Charging Compatible with Phone 5/ 5C/ 5S/ 6/ 6S/ 7/8/ X/XR/XS Max/ 11/12/ 13 Series and Pad Air/Mini, Pod & Other Devices (1.1 Meter, White)",
    "category": "Computers&Accessories|Accessories&Peripherals|Cables&Accessories|Cables|USBCable",
    "imageUrl": "https://m.media-amazon.com/images/I/317OoQfs1gL._SX300_SY300_QL70_FMwebp_.jpg",
    "description": "This sturdy and durable cable made of tpe and premium copper protects it from bending and coiling.|With data transfer speed up to 480 Mbps, it is built with safety protections with four-core copper wires promoting maximum signal while working.|It is tested bending ranges from 18k to 20k bends making it more durable, its 3d aluminium connector and laser welding technology make it hard to break and fits well giving a good connectivity-Phone charger cable.|Use it anywhere in the office or home or travelling, its easily foldable n fitted in a pocket to carry.|This cable comes with a charging & Data sync function.|This cable is unique in terms of design and multi-use and is positioned to provide the best comfort and performance while using.|Fast Charge&Data Sync: It can charge and sync simultaneously at a rapid speed, Compatible with any charging adaptor, multi-port charging station or power bank.",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-10-12T00:26:38.838412Z",
    "updatedAt": "2025-10-27T21:39:55.838423Z"
  },
  {
    "name": "Skadioo WiFi Adapter for pc | Car Accessories, WiFi Dongle for pc | USB WiFi Adapter for pc | Wi-Fi Receiver 2.4GHz, 802.11b/g/n UNano Size WiFi Dongle Compatible Adapter,WiFi dongle for pc",
    "category": "Computers&Accessories|NetworkingDevices|NetworkAdapters|WirelessUSBAdapters",
    "imageUrl": "https://m.media-amazon.com/images/W/WEBP_402378-T2/images/I/31HMoFzGZjL._SY300_SX300_QL70_FMwebp_.jpg",
    "description": "\u3010Powerful compatibility\u3011 Compatible with TV box, Windows XP / Vista / 7 / 8 / 10, Mac OS and Linux. The ultra-fast speed of the wireless adapter with the latest 802.11ac WiFi technology ensures a non-general web experience.|The device will not work with the systems that have no option to install device driver , so would not be compatible with DVR's . NVR's , Set top box , Music players , Car audio systems or any other device on which you can't install drivers|\u3010Ultra High Speed\u3011The USB WiFi adapter is equipped with 802.11n WiFi technology for faster speed and dual band, reducing interference and avoiding unexpected connection breaks or signal loss. Maximum speed up to 600 Mbpsat 2.4GHz, ideal for movies, HD video streaming, online gaming and video chatting.|\u3010Support any WiFi router and AP mode\u3011 with the USB Wi-Fi adapter, you can upgrade your TV box, PC, laptop or Mac and work with the latest AC Wi-Fi router for faster speed and longer range. In Soft AP mode, a wired internet connection",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-09-22T02:00:35.838542Z",
    "updatedAt": "2025-10-22T10:33:50.838553Z"
  },
  {
    "name": "FLiX (Beetel USB to Type C PVC Data Sync & 15W(3A) TPE Fast Charging Cable, Made in India, 480Mbps Data Sync, 1 Meter Long cable for all Andriod & all Type C Devices (Black)(XCD - FPC02)",
    "category": "Computers&Accessories|Accessories&Peripherals|Cables&Accessories|Cables|USBCable",
    "imageUrl": "https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/31w-BP4ey1L._SY445_SX342_QL70_FMwebp_.jpg",
    "description": "FLiX Flow Type C cable offers universal compatibility as it is compatible with most android smartphones, tablets, PC peripherals, Bluetooth speakers, power banks, game consoles & all Type C enabled devices|3A AMP fast charging cable with up to 480mbps data transfer for a fast and secure connection. The cable is Quick Charge (QC) compatible which supports upto 15 Watt of power transfer|The connectors used are capable not only for high-speed data transfer but also ensures secure, safe and stable connection|Product has gone through a stringent quality check for durability and has huge life span of 10,000 bends|Charge & sync, this USB cable can charge and data sync simultaneously at 480Mbps speed, compatible with all devices with a Type C port. Core : Tinned Copper",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-07-20T22:50:46.838712Z",
    "updatedAt": "2025-10-19T10:55:37.838739Z"
  },
  {
    "name": "Zoul USB C to USB C Fast Charging Cable 65W Type C to Type C Nylon Braided Cord Compatible with Macbook Oneplus 9 10R Samsung Galaxy S22 S21 Ultra Z Flip3 Macbook Air/Pro M1 Google Pixel 11'' iPad Pro 2020/2018 (2M, Grey)",
    "category": "Computers&Accessories|Accessories&Peripherals|Cables&Accessories|Cables|USBCable",
    "imageUrl": "https://m.media-amazon.com/images/I/41EhlNJ-v8L._SX300_SY300_QL70_FMwebp_.jpg",
    "description": "\u3010High Charging Speed 65W\u3011: Output power up to 20V 3.25A, which is ensured by high-speed and safe charging, and the USB 2.0 supports data transfer speed which can reach 40~60MB/S (480Mbps).|\u3010Kindly NOTE before you purchase\u3011:This is a USB-C to USB-C cable, which means it has the same USB C or Type C plug on both sides, please keep a note that this cable is not a USB-C to USB-A cable. Besides, you may need a USB C wall charger to charge your device. This product DO NOT support video output and monitor connection.|\u3010High Quality Type C to C cable\u3011: Its user-friendly design helps you to insert the connector in the right way all the time. This cable will be the right choice for a durable and cost-effective USB-C to USB-C cord/ Type C to Type C cord.|\u30103A Fast Charging \u3011\uff1a Build-in Emark smart chip, which makes this USB-C to USB-C PD cable strong enough to support max 3.25A current 65W power through, as well as support fast charging for more Type-C devices. You need a USB C wall charger for your",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-10-19T01:53:36.838867Z",
    "updatedAt": "2025-10-21T19:52:48.838877Z"
  },
  {
    "name": "FLiX (Beetel Flow USB to Micro USB PVC Data Sync & 12W(2.4A) Fast Charging Cable,Made in India,480Mbps Data Sync,Solid Cable,1 Meter Long cable for all Andriod & Micro USB Devices (Black)(XCD-FPM01)",
    "category": "Computers&Accessories|Accessories&Peripherals|Cables&Accessories|Cables|USBCable",
    "imageUrl": "https://m.media-amazon.com/images/I/31jSLNakA7L._SY445_SX342_QL70_FMwebp_.jpg",
    "description": "FLiX Flow Micro USB cable offers universal compatibility as it is compatible with most android smartphones, tablets, PC peripherals, Bluetooth speakers, power banks, game consoles & all Micro-USB enabled devices|2.4 AMP fast charging cable with up to 480mbps data transfer for a fast and secure connection. The cable is Quick Charge (QC) compatible which supports upto 12 Watt of power transfer|The connectors used are capable not only for high-speed data transfer but also ensures secure, safe and stable connection|Charge & sync, this USB cable can charge and data sync simultaneously at 480Mbps speed, compatible with all devices with a Micro USB port. Core : Tinned Copper",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-08-27T15:48:19.839081Z",
    "updatedAt": "2025-10-14T04:07:48.839109Z"
  },
  {
    "name": "7SEVEN\u00ae Bluetooth Voice Command Remote for Xiaomi Redmi Mi Smart TV with Netflix & Prime Video Hot Keys XMRM-00A",
    "category": "Electronics|HomeTheater,TV&Video|Accessories|RemoteControls",
    "imageUrl": "https://m.media-amazon.com/images/W/WEBP_402378-T2/images/I/21Nw+BXh1kS._SY300_SX300_.jpg",
    "description": "Compatible with MI Smart TV 4A 32 inch Led TV /Mi 4A 43 inch led TV | Mi LED Smart TV 4A (32 inch/43 inch) Mi Smart LED TV. Note: This remote not suitable for non smart or non android mi tv.|100% Best Quality Replacement Remote Control for Mi Smart TV with Bluetooth Voice Command.|Equipped with various buttons and controls, this remote lets you adjust settings of your Mi Smart Android TV 4A easily with the comfort of your sofa or bed. The remote has a compact and lightweight design that makes it easy to manage and use for longer period of time. All Products are checked by Electronic Testing machine Before Shipping. Before starting to use, please insert new set of batteries (Not included in this package)|This is an Imported Generic Product & Not Original Mi Remote.|For Pairing to LED TV, Please use new Alkaline Batteries.(Not Included Battery)",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-10-15T02:42:02.839238Z",
    "updatedAt": "2025-10-05T06:40:44.839257Z"
  },
  {
    "name": "Sony TV - Remote Compatible for Sony LED Remote Control Works with Sony LED TV by Trend Trail Speed tech & Remote hi Remote & REO India only",
    "category": "Electronics|HomeTheater,TV&Video|Accessories|RemoteControls",
    "imageUrl": "https://m.media-amazon.com/images/I/319bv0gNOeL._SX300_SY300_QL70_FMwebp_.jpg",
    "description": "Soft & Durable Keypad Durable Quality|Rigid Body|Efficient Performance Remotes are Quality Tested Before Shipment Suitable with Sony LED/LCD Tv without Smart Functions|2 AAA batteries Required",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-07-03T03:43:10.839419Z",
    "updatedAt": "2025-10-12T04:30:19.839431Z"
  },
  {
    "name": "Storite USB 3.0 Cable A to Micro B high Speed Upto 5 Gbps Data Transfer Cable for Portable External Hard Drive - (20cm), Black",
    "category": "Computers&Accessories|Accessories&Peripherals|Cables&Accessories|Cables|USBCable",
    "imageUrl": "https://m.media-amazon.com/images/W/WEBP_402378-T2/images/I/31RK9+CyhoL._SY300_SX300_.jpg",
    "description": "USB 3.0 Micro Cable A to Micro B For External Hard Drives/Disk; Quickly Transfer data from an external storage device to your PC or Laptop at 10x the speed of USB 2.0.|Connector A: USB 3.0 A (9 pin SuperSpeed) Male Connector B: USB 3.0 Micro-B (10 pin SuperSpeed) Male.|Superspeed USB 3.0 cable A to Micro B (10pin) Quickly transfer data from an external storage device to your PC or Laptop at 10x the speed of USB 2.0.|Great for lost or broken USB 3.0 Cables for external hard drives.|Connector Type: Micro Usb.",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-09-22T21:11:54.839561Z",
    "updatedAt": "2025-10-12T12:12:32.839572Z"
  },
  {
    "name": "boAt LTG 500 Apple MFI Certified for iPhone, iPad and iPod 2Mtr Data Cable(Space Grey)",
    "category": "Computers&Accessories|Accessories&Peripherals|Cables&Accessories|Cables|USBCable",
    "imageUrl": "https://m.media-amazon.com/images/I/41vVXPCqnML._SX300_SY300_QL70_FMwebp_.jpg",
    "description": "Compatible with Apple iPhone 6/ 6 Plus, 5S/5C/5, iPad Air 1/2, iPad2/3/4, iPad Mini 1/2/3, iPad Retina and iPod Touch|Spaceship grade aluminium cable casing ensures long-lasting durability and reliable charging|Metal braided heavy-duty cable skin, is stress and stretch resistant, protects against day-to-day wear and tear|Provides up to 2.4A data transfer and high-speed charging|Length: 2M",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-08-17T20:10:51.839688Z",
    "updatedAt": "2025-10-17T10:58:54.839699Z"
  },
  {
    "name": "AmazonBasics USB C to Lightning Aluminum with Nylon Braided MFi Certified Charging Cable (Grey, 1.2 meter)",
    "category": "Computers&Accessories|Accessories&Peripherals|Cables&Accessories|Cables|USBCable",
    "imageUrl": "https://m.media-amazon.com/images/I/41JooboBmuL._SX300_SY300_QL70_FMwebp_.jpg",
    "description": "Nylon-braided charging cable with a USB-C power adapter to fast charge your iPhone, iPad, and iPods|Supports fast and stable charging and superior data transfer in iPhone 13, 13 Pro, 13 mini; 12, 12 Pro Max, 12 Pro; 11, 11 Pro; X, XS, XR, XS Max; 8, 8 Plus; SE; iPad and iPod|Sturdy full-metal wire with durable full-metal design and premium metallic housing make it suitable for prolonged use daily|Takes about 30 minutes to charge up to 60% battery|Durable, tangle-free, Ultra-thin & lightweight|Cable offers 100% safety of the device|Length: 1.2 metres; Colour: Grey",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-08-07T02:39:00.839868Z",
    "updatedAt": "2025-10-23T11:13:54.839877Z"
  },
  {
    "name": "AmazonBasics Double Braided Nylon USB Type-C to Type-C 2.0 Cable Smartphone (Dark Grey, 3 feet)",
    "category": "Computers&Accessories|Accessories&Peripherals|Cables&Accessories|Cables|USBCable",
    "imageUrl": "https://m.media-amazon.com/images/I/41sNnS4Rl7L._SX300_SY300_QL70_FMwebp_.jpg",
    "description": "Connect USB Type-C enabled devices (MacBook, Chromebook Pixel, Galaxy Note 7, etc.) with standard USB Type-C 2.0 enabled devices and accessories (smartphones, car/wall charger, multi-port adapters, etc.)|Supports USB PD fast charging up to 60W 20V/3A; charges phones and laptop with USB C ports at high-speed; supports data transfer speed up to 480Mbps|Reversible design\u2014easily insert the connector into any Type-C enabled device (does not matter which side is up)|Durable braided nylon fiber cloth provides protection, strength, and flexibility; added layer of protection for improved durability and to reduce fraying; cables have been tested to bend 95-degrees 5,000 times; fun contemporary color options for a trendy appearance|Up to 480 Mbps data transfer speed; power output up to 5V, 3 amp; certified by USB-IF to be compliant with USB 2.0|1 year limited warranty",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-09-22T23:59:20.839980Z",
    "updatedAt": "2025-10-04T17:08:55.839989Z"
  },
  {
    "name": "Amazon Basics USB 3.0 Cable - A Male to Micro B - 6 Feet (1.8 Meters), Black",
    "category": "Computers&Accessories|Accessories&Peripherals|Cables&Accessories|Cables|USBCable",
    "imageUrl": "https://m.media-amazon.com/images/I/41p9mn0fmIL._SY300_SX300_QL70_FMwebp_.jpg",
    "description": "One USB 3.0 Cable - A Male to Micro B - 6 Feet (1.8 Meters)|Ideal for connecting USB 3.0 enabled PC peripherals such as hard drives, printers, network hubs and more|Enables throughput of up to 4.8Gbps when used with a USB 3.0 host and device|Constructed with corrosion-resistant, gold-plated connectors for optimal signal clarity and shielding to minimize interference|USB 3.0 uses less power, but has increased power output - up to 4.8 Gbit/s. Compared with the USB 2.0 transmission speed, USB 3.0 is 10 times faster|1 year limited warranty",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-08-30T20:31:55.840176Z",
    "updatedAt": "2025-10-08T09:15:20.840204Z"
  },
  {
    "name": "AmazonBasics USB C to Lightning Aluminum with Nylon Braided MFi Certified Charging Cable (Grey, 1.8 meter)",
    "category": "Computers&Accessories|Accessories&Peripherals|Cables&Accessories|Cables|USBCable",
    "imageUrl": "https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/514S7MylddL._SX300_SY300_QL70_FMwebp_.jpg",
    "description": "Nylon-braided charging cable with a USB-C power adapter to fast charge your iPhone, iPad, and iPods|Supports fast and stable charging and superior data transfer in iPhone 13, 13 Pro, 13 mini; 12, 12 Pro Max, 12 Pro; 11, 11 Pro; X, XS, XR, XS Max; 8, 8 Plus; SE; iPad and iPod|Sturdy full-metal wire with durable full-metal design and premium metallic housing make it suitable for prolonged use daily|Takes about 30 minutes to charge up to 60% battery|Durable, tangle-free, Ultra-thin & lightweight|Length: 1.8 metres; Colour: Grey",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-10-31T09:07:52.840404Z",
    "updatedAt": "2025-11-02T18:44:18.840425Z"
  },
  {
    "name": "Wayona Usb C 65W Fast Charging Cable Compatible For Tablets Samsung S22 S20 S10 S20Fe S21 S21 Ultra A70 A51 A71 A50S M31 M51 M31S M53 5G (1M, Black)",
    "category": "Computers&Accessories|Accessories&Peripherals|Cables&Accessories|Cables|USBCable",
    "imageUrl": "https://m.media-amazon.com/images/I/417MtmtMOvL._SY445_SX342_QL70_FMwebp_.jpg",
    "description": "\u3010NOTE before purchase\u3011: This is a USB-C to USB-C cable, which means it has the same USB C plug on both ends, please be aware that this is not a USB-C to USB-A cable. Besides, you may need a USB C wall charger to charge your device.|\u301065W High Speed Charging\u3011: Output power up to 20V 3.25A, which is ensured by high-speed safe charging, and the USB 2.0 supports data transfer speed can reach 40~60MB/S (480Mbps). NOTE: This product DO NOT support video output and monitor connection.|\u3010Compatibility List\u3011: This USB C to USB C cable compatible with Samsung Galaxy S21 S21+ / S20 S20+ S20 Ultra Note10/Note 10 Plus,S20, S21 Ultra, iPad Air 2020 10.9\u2018\u2019 (Gen 4), iPad Pro 12.9'' Gen3 (2018) , iPad Pro 11'' (2018), Nexus 6P/5X , Compatible with Macbook with the original charger (View Product Description for details)|\u3010Military grade material\u3011: Strong military fiber, the most flexible, powerful and durable material, makes tensile force increased by 200%. Special Strain Relief design, can bear 10000+ ben",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-11-03T03:35:23.840648Z",
    "updatedAt": "2025-10-07T09:14:11.840666Z"
  },
  {
    "name": "Karbonn 80 cm (32 inches) Millenium Bezel-Less Series HD Ready Smart LED TV KJW32SKHD (Phantom Black)",
    "category": "Electronics|HomeTheater,TV&Video|Televisions|SmartTelevisions",
    "imageUrl": "https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/41Q5zqyjWPL._SY300_SX300_QL70_FMwebp_.jpg",
    "description": "Resolution: HD Ready (1366x768) | Reresh Rate : 60 hertz | 16:09 Display Scale|Connectivity: 2 HDMI Ports to connect set-top box, Blu Ray players and gaming console | 2 USB Ports to connect hard drives and other USB devices | 2 AV Input ports | RF Port | RJ45 | Wi-Fi|Smart TV Features: Android 9.0 (GOS) | In-built Apps Store | Screen Sharing | Remote with Hotkeys | Movie Box | Performance: Quad-Core A53 1.5GHz Processor | RAM 1GB | ROM 8GB|Sound: 20W Audio Output|Display: HD Ready Crystal Clear Display | Bezel-less Design | Dynamic Contrast | High Brightness | Vivid Colour Engine|Warranty Information: 1 year warranty provided by the manufacturer from date of purchase|Installation: Customer needs to call the Customer care for this product once delivered. Contact brand for assistance @ (Please visit brand website for tollfree numbers) and provide product's model name and seller's details mentioned on your invoice. The service center will allot you a convenient slot for the service|Easy r",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-06-08T18:26:00.840818Z",
    "updatedAt": "2025-10-27T06:31:12.840829Z"
  },
  {
    "name": "BlueRigger Digital Optical Audio Toslink Cable (6 Feet / 1.8 Meter) With 8 Channel (7.1) Audio Support (for Home Theatre, Xbox, Playstation etc.)",
    "category": "Electronics|HomeTheater,TV&Video|Accessories|Cables|OpticalCables",
    "imageUrl": "https://m.media-amazon.com/images/W/WEBP_402378-T2/images/I/41CF6GtnpKL._SX300_SY300_QL70_FMwebp_.jpg",
    "description": "Enables easy installation of audio components to your audio or home theater system|Digital optical cable constructed with durable black PVC outer layer and corrosion-resistant gold-plated connectors for optimal signal transfer|Precision-polished optical connectors allow maximum signal transfer accuracy. Specially optimized optical fiber for higher fidelity|Compatible with S/PDIF, ADAT's, Dolby Digital, & DTS|Limited Lifetime Warranty|Country of Origin: China",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-09-25T04:29:55.840996Z",
    "updatedAt": "2025-10-19T21:53:30.841006Z"
  },
  {
    "name": "VW 60 cm (24 inches) Premium Series HD Ready LED TV VW24A (Black)",
    "category": "Electronics|HomeTheater,TV&Video|Televisions|StandardTelevisions",
    "imageUrl": "https://m.media-amazon.com/images/W/WEBP_402378-T2/images/I/41UPNmnPgeL._SY300_SX300_QL70_FMwebp_.jpg",
    "description": "Sound output: 20 Watts Output | In-built Box Speakers|Resolution: HD Ready (1366 x 768) | Refresh Rate: 60 hertz | Viewing angle: 178 degree|Installation: For requesting installation/wall mounting/demo of this product once delivered, please directly call Visio World support on (Please visit brand website for toll free numbers) and provide product's model name as well as seller's details mentioned on the invoice|Connectivity: 1 HDMI ports to connect set top box, Blue Ray players, gaming console | 2 USB ports to connect hard drives and other USB devices|Display: A+ Grade Panel | IPE technology | True colour | Wide Viewing Angle|Easy returns: This product is eligible for replacement/refund within 10 days of delivery in case of any product defects, damage or features not matching the description provided|Warranty Information: 1 year warranty provided by Visio World from date of purchase",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-05-30T15:05:22.841146Z",
    "updatedAt": "2025-10-12T09:31:28.841155Z"
  },
  {
    "name": "Amazon Basics USB A to Lightning MFi Certified Charging Cable (White, 1.2 meter)",
    "category": "Computers&Accessories|Accessories&Peripherals|Cables&Accessories|Cables|USBCable",
    "imageUrl": "https://m.media-amazon.com/images/W/WEBP_402378-T2/images/I/31VSKlEpP-L._SX300_SY300_QL70_FMwebp_.jpg",
    "description": "MFi-certified charging cable for securely charging Apple devices|Compatible with iPhone 13, 12, 11; 13, 12 ,11 Pro; 13, 12 11 Pro Max; 13, 12 mini; XS, XS Max, XR, X; 8 Plus, 8; 7 Plus , 7; 6s Plus, 6s, 6 Plus, 6; 5s, 5c, 5; iPad Pro, iPad Air, Air 2, iPad mini, mini 2, mini 4, iPad 4th gen; iPod Touch 5th gen, iPod nano 7th gen and Beats Pill+|Full-metal cable. Can bend up to 90 degrees|Wide wire and reduced cord resistance deliver high speed charging (up to 2.4 amps charging current)|Uses Apple's original C89 smart chip that recognises and instantly connects to Apple devices to provides safe, stable charging solution|Damage-resistant connectors fit securely|An extra protective layer added to the lightning and USB ends for durability and reduced fraying|Length: 1.2 metres; Colour: White",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-10-05T05:05:48.841275Z",
    "updatedAt": "2025-10-16T03:56:51.841284Z"
  },
  {
    "name": "Samsung 138 cm (55 inches) Crystal 4K Neo Series Ultra HD Smart LED TV UA55AUE65AKXXL (Black)",
    "category": "Electronics|HomeTheater,TV&Video|Televisions|SmartTelevisions",
    "imageUrl": "https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/41IAkUhz1NL._SY300_SX300_QL70_FMwebp_.jpg",
    "description": "Resolution : Crystal 4K Ultra HD (3840 x 2160) | Refresh Rate : 50 Hertz|Connectivity: 3 HDMI ports to connect set top box, Blu-ray speakers or a gaming console | 1 USB ports to connect hard drives or other USB devices|Display: Ultra HD (4k) LED Panel | One Billion Colors | New Bezel-less Design | Supports HDR 10+ | PurColor | Mega Contarst | UHD Dimming | Auto Game Mode|Sound: 20 Watts Output | Powerful Speakers with Dolby Digital Plus | Q Symphony|Smart TV Features : Prime Video, Hotstar, Netflix, Zee5 and more | Voice Assistant - Bixby & Alexa | Tap View | PC Mode | Universal Guide | Web Browser | Screen Mirroring|Warranty Information: 1 year comprehensive warranty plus additional 1 years on panel by brand from date of invoice|Installation: For requesting installation/wall mounting/demo of this product once delivered, please directly call Samsung support on (Visit Brand website for tollfree numbers) and provide product's model name as well as seller's details mentioned on the invoic",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-06-20T06:07:20.841425Z",
    "updatedAt": "2025-11-02T19:13:11.841453Z"
  },
  {
    "name": "LOHAYA Television Remote Compatible for VU LED LCD HD Tv Remote Control Model No :- EN2B27V",
    "category": "Electronics|HomeTheater,TV&Video|Accessories|RemoteControls",
    "imageUrl": "https://m.media-amazon.com/images/W/WEBP_402378-T2/images/I/316rtwd6jOL._SX300_SY300_QL70_FMwebp_.jpg",
    "description": "Compatible Device For VU LED LCD HD Tv Remote Control Model No :- EN2B27V|100% Best Quality Plastic Body and Soft Silicone Rubber Keypad|Remotes are checked by Testing Machine Before Shipment|Imported Generic Product Not by VU|Please MatcThe Replaced Remote Control Can Work for Below Knowing Models: 55S6575 49S6575 43S6575 40S6575 32S6575 LED40K16 LEDN50K310X3D LTDN55XT780XWAU3D LTDN65XT780XWAU3D 55S6575 49S6575 43S6575 40S6575 32S6575 LED40K16 LEDN50K310X3D LTDN55XT780XWAU3D LTDN65XT780XWAU3D with Netflix and YouTube Shortcut Keys",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-08-05T10:31:36.841649Z",
    "updatedAt": "2025-10-16T10:01:05.841668Z"
  },
  {
    "name": "Duracell Micro USB 3A Braided Sync & Fast Charging Cable, 3.9 Feet (1.2M). Supports QC 2.0/3.0 Charging, High Speed Data Transmission - Black",
    "category": "Computers&Accessories|Accessories&Peripherals|Cables&Accessories|Cables|USBCable",
    "imageUrl": "https://m.media-amazon.com/images/I/41Fu3K9KAZL._SX300_SY300_QL70_FMwebp_.jpg",
    "description": "1.2M Tangle Free durable tough braiding sync & charge cable|Supports Quick Charge 2.0 and 3.0, with max output up to 3A|Ensure fast and stable data transmission up to 480 Mbps|Up to 10,000+ bend and 10,000+ plugging and unplugging test ensure this cable a longer lifespan|Compatibile Designed to work flawlessly with all Micro USB devices|2 Years Warranty",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-07-18T01:13:14.841867Z",
    "updatedAt": "2025-10-15T21:21:48.841894Z"
  },
  {
    "name": "Zebronics CU3100V Fast charging Type C cable with QC 18W support, 3A max capacity, 1 meter braided cable, Data transfer and Superior durability (Braided Black + White)",
    "category": "Computers&Accessories|Accessories&Peripherals|Cables&Accessories|Cables|USBCable",
    "imageUrl": "https://m.media-amazon.com/images/I/31PBfa92GVL._SX300_SY300_QL70_FMwebp_.jpg",
    "description": "Fast charging support for various smart phones with the standard QC 18W support (using compatible USB charger).|Maximum 3A current carrying capacity for efficient charging speed.|1 meter Braided cable for durability and long term usage.|Transfer files to & from your smartphone with your Laptop / Computer easily, using the ZEB-CU3100V Type C cable.|High quality mould and premium finish to provide the best usage experience.",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-07-22T19:33:50.842036Z",
    "updatedAt": "2025-10-28T19:07:44.842048Z"
  },
  {
    "name": "FLiX (Beetel) USB to iPhone Lightning Textured Pattern Data Sync & 2A Fast Charging Cable, Made in India, 480Mbps Data Sync, Tough Cable, 1 Meter Long USB Cable for Apple Devices (Black)(XCD-L102)",
    "category": "Computers&Accessories|Accessories&Peripherals|Cables&Accessories|Cables|USBCable",
    "imageUrl": "https://m.media-amazon.com/images/I/31s3DOD2d1L._SY445_SX342_QL70_FMwebp_.jpg",
    "description": "TPE material|Output port, 1 meter USB cable length|Customer care number: 1800-102-2700 for product related queries",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-05-24T15:57:51.842172Z",
    "updatedAt": "2025-11-01T23:04:20.842198Z"
  },
  {
    "name": "MI 108 cm (43 inches) 5A Series Full HD Smart Android LED TV L43M7-EAIN (Black)",
    "category": "Electronics|HomeTheater,TV&Video|Televisions|SmartTelevisions",
    "imageUrl": "https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/41jh12qGXuL._SX300_SY300_QL70_FMwebp_.jpg",
    "description": "Note : The brands, Mi and Xiaomi, are part of the same multinational conglomerate|Resolution : Full HD (1920 x 1080) Resolution | Refresh Rate : 60 Hertz | 178 Degree wide viewing angle|Connectivity: Dual Band Wi-Fi | 2 HDMI ports to connect latest gaming consoles, set top box, Blu-ray Players | 2 USB ports to connect hard drives and other USB devices | ALLM | ARC | Bluetooth 5.0 | Ethernet|Sound: 24 Watts Output | Dolby Audio, DTS:X, DTS Virtual: X|Smart TV Features : Android TV 11 | PatchWall | IMDb Integration | Universal Search | 300+ Free Live Channels | Kids Mode with Parental lock | Smart Recommendations | Language Universe \u2013 15+ Languages | User Centre | Okay Google | Chromecast suporting Apps : Netflix, Prime Video, Disney+ Hotstar | 5000+ apps from Play Store |Quad core Cortex A55 | Chromecast built-in | Ok Google | Auto Low Latency Mode | 1.5 GB RAM + 8GB Storage|Display: Full HD | Vivid Picture Engine|Warranty Information: 1 year comprehensive warranty on product and 1 year",
    "cost_price": null,
    "selling_price": null,
    "batch_size": 5,
    "createdAt": "2025-06-30T04:03:17.842357Z",
    "updatedAt": "2025-10-09T03:48:35.842367Z"
  }
];

  const createdProducts = [];
  for (let i = 0; i < productsData.length; i++) {
    const p = productsData[i];
    // assign supplier round-robin from suppliers array
    
    // inside for loop
  const costPrice =
    p.cost_price && !isNaN(p.cost_price)
      ? Number(p.cost_price) // keep CSV price
      : Math.floor(Math.random() * (500 - 50 + 1)) + 50; // random 50–500

  const sellingPrice =
    p.selling_price && !isNaN(p.selling_price)
      ? Number(p.selling_price) // keep CSV price
      : costPrice + Math.floor(Math.random() * 200) + 50; // random +50–250

    const created = await prisma.product.upsert({
  where: { id: i + 1 }, // assumes your product IDs are 1..198
  update: {
    cost_price: costPrice,
    selling_price: sellingPrice,
  },
  create: {
    name: p.name,
    category: p.category,
    imageUrl: p.imageUrl,
    description: p.description,
    cost_price: costPrice,
    selling_price: sellingPrice,
    batch_size: p.batch_size,
    supplierId: supplierIds[i % supplierIds.length],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
});
createdProducts.push(created);
}

console.log('Processed products count:', createdProducts.length);

// 3) Create or update inventory entries
const warehouses = [1, 2, 3];
const inventoryInserts = [];

for (let i = 0; i < createdProducts.length; i++) {
  const prod = createdProducts[i];
  const warehouseId = warehouses[i % warehouses.length];
  const quantity = Math.floor(Math.random() * 190) + 10;

  const inv = await prisma.inventory.upsert({
    where: {
      warehouseId_productId: {
        warehouseId,
        productId: prod.id,
      },
    },
    update: {
      quantity,
      lastUpdated: new Date(),
    },
    create: {
      warehouseId,
      productId: prod.id,
      quantity,
      min_stock: 5,
      expiry: null,
    },
  });

  inventoryInserts.push(inv);
}

console.log('Inventory entries processed:', inventoryInserts.length);
}

main()
  .then(() => {
    console.log('Seeding finished.');
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });