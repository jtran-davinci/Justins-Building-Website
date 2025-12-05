var budgetInput = document.querySelector(".budget");
var allParts = document.getElementById("allParts");
var budgetOverlay = document.getElementById("budgetOverlay");
var testButton = document.getElementById("testButton");

// Budget Input
var Budget = null;
var AvailableBudget = null;
var Total = 0;

// FPS Texts
var ValorantText = document.getElementById("valorantFPS");
var RobloxText = document.getElementById("robloxFPS");
var FortniteText = document.getElementById("fortniteFPS");
var CyberpunkText = document.getElementById("cyberpunkFPS");

// Buttons
var caseButton = document.getElementById("caseButton");
var motherboardButton = document.getElementById("motherboardButton");
var cpuButton = document.getElementById("cpuButton");
var cpuCoolerButton = document.getElementById("cpuCoolerButton");
var ramButton = document.getElementById("ramButton");
var ssdButton = document.getElementById("ssdButton");
var psuButton = document.getElementById("psuButton");
var gpuButton = document.getElementById("gpuButton");

// Part Boxes
var caseBox = document.getElementById("caseBox");
var motherboardBox = document.getElementById("motherboardBox");
var cpuBox = document.getElementById("cpuBox");
var cpuCoolerBox = document.getElementById("cpuCoolerBox");
var ramBox = document.getElementById("ramBox");
var ssdBox = document.getElementById("ssdBox");
var psuBox = document.getElementById("psuBox");
var gpuBox = document.getElementById("gpuBox");

// Part Template
var partTemplate = document.getElementById("part-template");

var PromptOverlay = document.getElementById("prompt-overlay");
var PromptContent = document.getElementById("prompt-content");
var ResultsContent = document.getElementById("results-content");
var PromptPartContainer = document.getElementById("part-container");
var PromptTitle = document.getElementById("prompt-title");
var PromptDesc = document.getElementById("prompt-desc");

// Games CPU & GPU ratio
var gamesRatios = {
  valorant: {
    cpu: 0.3,
    gpu: 0.7,
    standardFPS: 100,
  },
  roblox: {
    cpu: 0.4,
    gpu: 0.6,
    standardFPS: 120,
  },
  fortnite: {
    cpu: 0.4,
    gpu: 0.6,
    standardFPS: 100,
  },
  cyberpunk: {
    cpu: 0.2,
    gpu: 0.8,
    standardFPS: 60,
  },
};
// Sounds
var sounds = {
  hover: "sounds/ui/hover.mp3",
  leave: "sounds/ui/leave.mp3",
  click: "sounds/ui/click.mp3",
};

var installSounds = {
  cpu: "sounds/parts/cpu-install.mp3",
  cpuCooler: "sounds/parts/cpucooler-install.mp3",
  gpu: "sounds/parts/gpu-install.mp3",
  motherboard: "sounds/parts/motherboard-install.mp3",
  case: "sounds/parts/pc-case.mp3",
  psu: "sounds/parts/psu-install.mp3",
  ram: "sounds/parts/ram-install.mp3",
  ssd: "sounds/parts/ssd-install.mp3",
};

// Matrix Configuration of PC
var ConfigLimits = {
  caseSize: null,
  gpuMaxSize: null,
  moboSize: null,
  memoryType: null,
  socket: null,
  memory: null,
  cpuScore: null,
  gpuScore: null,
  wattageNeeded: null,
};

// Database of PartList
var PartDatabase = {
  case: {
    [1]: {
      name: "Montech XR",
      desc: "Mid-Tower, Steel Frame, Tempered Glass Side Panels",
      price: 79.99,
      path: "images/parts/cases/Montech_XR.png",
      limits: {
        [1]: {
          category: "Case Size",
          limit: "ATX",
        },
        [2]: {
          category: "GPU Size Limit",
          limit: "420mm",
        },
      },
    },
    [2]: {
      name: "Lian Li Vector V100",
      desc: "Black Tempered Glass ATX Mid-Tower Computer Case",
      price: 79.99,
      path: "images/parts/cases/Lian_Li_Vector_V100.png",
      limits: {
        [1]: {
          category: "Case Size",
          limit: "ATX",
        },
        [2]: {
          category: "GPU Size Limit",
          limit: "420mm",
        },
      },
    },
    [3]: {
      name: "Lian Li LANCOOL 217",
      desc: "Black Tempered Glass ATX Mid-Tower Computer Case",
      price: 119.99,
      path: "images/parts/cases/Lian_Li_Lancool_217.png",
      limits: {
        [1]: {
          category: "Case Size",
          limit: "ATX",
        },
        [2]: {
          category: "GPU Size Limit",
          limit: "380mm",
        },
      },
    },
    [4]: {
      name: "Lian Li O11 Vision Compact",
      desc: "Black Tempered Glass ATX Mid-Tower Computer Case",
      price: 124.99,
      path: "images/parts/cases/Lian_Li_O11.png",
      limits: {
        [1]: {
          category: "Case Size",
          limit: "ATX",
        },
        [2]: {
          category: "GPU Size Limit",
          limit: "408mm",
        },
      },
    },
    [5]: {
      name: "Lian Li Lancool 207",
      desc: "Black Tempered Glass ATX Mid-Tower Computer Case",
      price: 89.99,
      path: "images/parts/cases/Lian_Li_Lancool_207.png",
      limits: {
        [1]: {
          category: "Case Size",
          limit: "ATX",
        },
        [2]: {
          category: "GPU Size Limit",
          limit: "410mm",
        },
      },
    },
    [6]: {
      name: "Lian Li O11D EVO",
      desc: "Black Tempered Glass ATX Mid-Tower Computer Case",
      price: 169.99,
      path: "images/parts/cases/Lian_Li_O11D_EVO.png",
      limits: {
        [1]: {
          category: "Case Size",
          limit: "ATX",
        },
        [2]: {
          category: "GPU Size Limit",
          limit: "455mm",
        },
      },
    },
    [7]: {
      name: "HYTE Y70 Touch Infinite",
      desc: "Black Modern Aesthetic Tempered Glass ATX Mid-Tower Computer Case",
      price: 359.99,
      path: "images/parts/cases/HYTE_Y70_Touch_Infinite.png",
      limits: {
        [1]: {
          category: "Case Size",
          limit: "ATX",
        },
        [2]: {
          category: "GPU Size Limit",
          limit: "422mm",
        },
      },
    },
    [8]: {
      name: "NZXT H5 Flow (2024)",
      desc: "Black Tempered Glass ATX Mid-Tower Computer Case",
      price: 89.99,
      path: "images/parts/cases/NZXT_H5_Flow.png",
      limits: {
        [1]: {
          category: "Case Size",
          limit: "ATX",
        },
        [2]: {
          category: "GPU Size Limit",
          limit: "365mm",
        },
      },
    },
    [9]: {
      name: "Montech KING 95 Pro",
      desc: "Black Tempered Glass ATX Mid-Tower Computer Case",
      price: 134.99,
      path: "images/parts/cases/Montech_KING_95_Pro.png",
      limits: {
        [1]: {
          category: "Case Size",
          limit: "ATX",
        },
        [2]: {
          category: "GPU Size Limit",
          limit: "420mm",
        },
      },
    },
    [10]: {
      name: "NZXT H6 Flow",
      desc: "Black Tempered Glass ATX Mid-Tower Computer Case",
      price: 99.99,
      path: "images/parts/cases/NZXT_H6_Flow.png",
      limits: {
        [1]: {
          category: "Case Size",
          limit: "ATX",
        },
        [2]: {
          category: "GPU Size Limit",
          limit: "365mm",
        },
      },
    },
    [11]: {
      name: "Fractal Design Focus G",
      desc: "Black Acrylic Window ATX Mid-Tower Computer Case",
      price: 99.99,
      path: "images/parts/cases/Fractal_Design_Focus_G.png",
      limits: {
        [1]: {
          category: "Case Size",
          limit: "ATX",
        },
        [2]: {
          category: "GPU Size Limit",
          limit: "380mm",
        },
      },
    },
    [12]: {
      name: "Fractal Design Terra",
      desc: "Jade Mini-ITX Mini Tower Computer Case",
      price: 199.99,
      path: "images/parts/cases/Fractal_Design_Terra.png",
      limits: {
        [1]: {
          category: "Case Size",
          limit: "miniITX",
        },
        [2]: {
          category: "GPU Size Limit",
          limit: "322mm",
        },
      },
    },
    [13]: {
      name: "Fractal Design Define 7 XL",
      desc: "Black eATX Full Tower Computer Case",
      price: 249.99,
      path: "images/parts/cases/Fractal_Design_Define_7_XL.png",
      limits: {
        [1]: {
          category: "Case Size",
          limit: "E-ATX",
        },
        [2]: {
          category: "GPU Size Limit",
          limit: "340mm",
        },
      },
    },
    [14]: {
      name: "Corsair 3500X",
      desc: "Black RGB Tempered Glass ATX Mid-Tower Computer Case",
      price: 119.99,
      path: "images/parts/cases/Corsair_3500X.png",
      limits: {
        [1]: {
          category: "Case Size",
          limit: "ATX",
        },
        [2]: {
          category: "GPU Size Limit",
          limit: "410mm",
        },
      },
    },
    [15]: {
      name: "Lian Li A3",
      desc: "Black microATX Mid-Tower Computer Case",
      price: 119.99,
      path: "images/parts/cases/Lian_Li_A3.png",
      limits: {
        [1]: {
          category: "Case Size",
          limit: "microATX",
        },
        [2]: {
          category: "GPU Size Limit",
          limit: "430mm",
        },
      },
    },
    [16]: {
      name: "HYTE Y60 Modern Aesthetic",
      desc: "White Dual Chamber Panoramic Tempered Glass Case",
      price: 141.99,
      path: "images/parts/cases/HYTE_Y60_Modern_Aesthetic.png",
      limits: {
        [1]: {
          category: "Case Size",
          limit: "ATX",
        },
        [2]: {
          category: "GPU Size Limit",
          limit: "375mm",
        },
      },
    },
    [17]: {
      name: "Fractal Design Meshify 2",
      desc: "Black ATX Flexible Light Tinted Tempered Glass Case",
      price: 174.99,
      path: "images/parts/cases/Fractal_Design_Meshify_2.png",
      limits: {
        [1]: {
          category: "Case Size",
          limit: "ATX",
        },
        [2]: {
          category: "GPU Size Limit",
          limit: "491mm",
        },
      },
    },
    [18]: {
      name: "Antec C8 Wood",
      desc: "Black Tempered Glass eATX Full Tower Computer Case",
      price: 119.99,
      path: "images/parts/cases/Antec_C8_Wood.png",
      limits: {
        [1]: {
          category: "Case Size",
          limit: "E-ATX",
        },
        [2]: {
          category: "GPU Size Limit",
          limit: "440mm",
        },
      },
    },
    [19]: {
      name: "Antec Flux",
      desc: "Black Tempered Glass ATX Mid-Tower Computer Case",
      price: 119.99,
      path: "images/parts/cases/Antec_Flux.png",
      limits: {
        [1]: {
          category: "Case Size",
          limit: "ATX",
        },
        [2]: {
          category: "GPU Size Limit",
          limit: "408mm",
        },
      },
    },
    [19]: {
      name: "NZXT H9 Flow",
      desc: "Black Tempered Glass ATX Mid-Tower Computer Case",
      price: 119.99,
      path: "images/parts/cases/NZXT_H9_Flow.png",
      limits: {
        [1]: {
          category: "Case Size",
          limit: "ATX",
        },
        [2]: {
          category: "GPU Size Limit",
          limit: "435mm",
        },
      },
    },
    [20]: {
      name: "Fractal Design Torrent",
      desc: "Black Tempered Glass ATX Mid-Tower Computer Case",
      price: 249.99,
      path: "images/parts/cases/Fractal_Design_Torrent.png",
      limits: {
        [1]: {
          category: "Case Size",
          limit: "ATX",
        },
        [2]: {
          category: "GPU Size Limit",
          limit: "460mm",
        },
      },
    },
    [21]: {
      name: "Phanteks Evolv X2",
      desc: "White Tempered Glass ATX Mid-Tower Computer Case",
      price: 169.99,
      path: "images/parts/cases/Phanteks_Evolv_X2.png",
      limits: {
        [1]: {
          category: "Case Size",
          limit: "ATX",
        },
        [2]: {
          category: "GPU Size Limit",
          limit: "380mm",
        },
      },
    },
    [22]: {
      name: "Gamdias ATHENA M4M WOOD",
      desc: "Black Tempered Glass microATX Mini Tower Computer Case",
      price: 79.99,
      path: "images/parts/cases/Gamdias_ATHENA_M4M_WOOD.png",
      limits: {
        [1]: {
          category: "Case Size",
          limit: "microATX",
        },
        [2]: {
          category: "GPU Size Limit",
          limit: "395mm",
        },
      },
    },
    [23]: {
      name: "HAVN BF 360",
      desc: "White Tempered Glass ATX Mid-Tower Computer Case",
      price: 199.99,
      path: "images/parts/cases/HAVN_BF_360.png",
      limits: {
        [1]: {
          category: "Case Size",
          limit: "ATX",
        },
        [2]: {
          category: "GPU Size Limit",
          limit: "410mm",
        },
      },
    },
    [24]: {
      name: "HYTE Y40",
      desc: "White Tempered Glass ATX Mid-Tower Computer Case",
      price: 99.99,
      path: "images/parts/cases/HYTE_Y40.png",
      limits: {
        [1]: {
          category: "Case Size",
          limit: "ATX",
        },
        [2]: {
          category: "GPU Size Limit",
          limit: "422mm",
        },
      },
    },
    [25]: {
      name: "HYTE X50",
      desc: "Black Tempered Glass ATX Mid-Tower Computer Case",
      price: 159.99,
      path: "images/parts/cases/HYTE_X50.png",
      limits: {
        [1]: {
          category: "Case Size",
          limit: "ATX",
        },
        [2]: {
          category: "GPU Size Limit",
          limit: "430mm",
        },
      },
    },
    [26]: {
      name: "Lian Li DK-07X Dual Chamber",
      desc: "Black eATX Tempered Glass Computer Desk Case",
      price: 1299.99,
      path: "images/parts/cases/Lian_Li_DK_07X_Dual_Chamber.png",
      limits: {
        [1]: {
          category: "Case Size",
          limit: "E-ATX",
        },
        [2]: {
          category: "GPU Size Limit",
          limit: "383mm",
        },
      },
    },
    [27]: {
      name: "Fractal Design North",
      desc: "Black and Walnut Computer Case",
      price: 108.99,
      path: "images/parts/cases/Fractal_Design_North.png",
      limits: {
        [1]: {
          category: "Case Size",
          limit: "ATX",
        },
        [2]: {
          category: "GPU Size Limit",
          limit: "355mm",
        },
      },
    },
    [28]: {
      name: "ASUS Prime AP201",
      desc: "Black microATX Mini Tower Computer Case",
      price: 89.99,
      path: "images/parts/cases/ASUS_Prime_AP201.png",
      limits: {
        [1]: {
          category: "Case Size",
          limit: "microATX",
        },
        [2]: {
          category: "GPU Size Limit",
          limit: "338mm",
        },
      },
    },
    [29]: {
      name: "Thermaltake TR100",
      desc: "Black Mini-ITX Mini Tower Computer Case",
      price: 149.99,
      path: "images/parts/cases/Thermaltake_TR100.png",
      limits: {
        [1]: {
          category: "Case Size",
          limit: "miniITX",
        },
        [2]: {
          category: "GPU Size Limit",
          limit: "360mm",
        },
      },
    },
    [30]: {
      name: "SSUPD Meshroom S",
      desc: "Black Mini-ITX Mini Tower Computer Case",
      price: 149.99,
      path: "images/parts/cases/SSUPD_Meshroom_S.png",
      limits: {
        [1]: {
          category: "Case Size",
          limit: "miniITX",
        },
        [2]: {
          category: "GPU Size Limit",
          limit: "332mm",
        },
      },
    },
  },
  motherboard: {
    [1]: {
      name: "MSI X870E MEG GODLIKE",
      desc: "AMD AM5 eATX Motherboard",
      price: 899.99,
      path: "images/parts/motherboard/MSI_X870E_MEG_GODLIKE.png",
      limits: {
        [1]: {
          category: "Motherboard Size",
          limit: "E-ATX",
        },
        [2]: {
          category: "Socket",
          limit: "AM5",
        },
      },
    },
    [2]: {
      name: "Gigabyte X870 AORUS TACHYON ICE",
      desc: "AMD AM5 eATX Motherboard",
      price: 599.99,
      path: "images/parts/motherboard/Gigabyte_X870_AORUS_TACHYON_ICE.png",
      limits: {
        [1]: {
          category: "Motherboard Size",
          limit: "E-ATX",
        },
        [2]: {
          category: "Socket",
          limit: "AM5",
        },
      },
    },
    [3]: {
      name: "ASRock X870E Taichi",
      desc: "AMD AM5 eATX Motherboard",
      price: 449.99,
      path: "images/parts/motherboard/ASRock_X870E_Taichi.png",
      limits: {
        [1]: {
          category: "Motherboard Size",
          limit: "E-ATX",
        },
        [2]: {
          category: "Socket",
          limit: "AM5",
        },
      },
    },
    [4]: {
      name: "ASUS X870E ROG CROSSHAIR HERO",
      desc: "AMD AM5 ATX Motherboard",
      price: 699.99,
      path: "images/parts/motherboard/ASUS_X870E_ROG_CROSSHAIR_HERO.png",
      limits: {
        [1]: {
          category: "Motherboard Size",
          limit: "ATX",
        },
        [2]: {
          category: "Socket",
          limit: "AM5",
        },
      },
    },
    [5]: {
      name: "Gigabyte X870 AORUS ELITE WIFI7",
      desc: "AMD AM5 ATX Motherboard",
      price: 279.99,
      path: "images/parts/motherboard/Gigabyte_X870_AORUS_ELITE_WIFI7.png",
      limits: {
        [1]: {
          category: "Motherboard Size",
          limit: "ATX",
        },
        [2]: {
          category: "Socket",
          limit: "AM5",
        },
      },
    },
    [6]: {
      name: "Gigabyte B650 Gaming X AX V2",
      desc: "AMD AM5 ATX Motherboard",
      price: 199.99,
      path: "images/parts/motherboard/Gigabyte_B650_Gaming_X_AX_V2.png",
      limits: {
        [1]: {
          category: "Motherboard Size",
          limit: "ATX",
        },
        [2]: {
          category: "Socket",
          limit: "AM5",
        },
      },
    },
    [7]: {
      name: "ASUS B650-E TUF Gaming WiFi",
      desc: "AMD AM5 ATX Motherboard",
      price: 103.99,
      path: "images/parts/motherboard/ASUS_B650-E_TUF_Gaming_WiFi.png",
      limits: {
        [1]: {
          category: "Motherboard Size",
          limit: "ATX",
        },
        [2]: {
          category: "Socket",
          limit: "AM5",
        },
      },
    },
    [8]: {
      name: "ASUS B850M-PLUS TUF Gaming WiFi",
      desc: "AMD AM5 microATX Motherboard",
      price: 199.99,
      path: "images/parts/motherboard/ASUS_B850M-PLUS_TUF_Gaming_Wifi.png",
      limits: {
        [1]: {
          category: "Motherboard Size",
          limit: "microATX",
        },
        [2]: {
          category: "Socket",
          limit: "AM5",
        },
      },
    },
    [9]: {
      name: "MSI B840M-B PRO",
      desc: "AMD AM5 microATX Motherboard",
      price: 129.99,
      path: "images/parts/motherboard/MSI_B840M-B_PRO.png",
      limits: {
        [1]: {
          category: "Motherboard Size",
          limit: "microATX",
        },
        [2]: {
          category: "Socket",
          limit: "AM5",
        },
      },
    },
    [10]: {
      name: "ASUS X870-I ROG STRIX GAMING WIFI",
      desc: "AMD AM5 miniITX Motherboard",
      price: 449.99,
      path: "images/parts/motherboard/ASUS_X870-I_ROG_STRIX_GAMING_WIFI.png",
      limits: {
        [1]: {
          category: "Motherboard Size",
          limit: "miniITX",
        },
        [2]: {
          category: "Socket",
          limit: "AM5",
        },
      },
    },
    [11]: {
      name: "Gigabyte X870I AORUS PRO ICE",
      desc: "AMD AM5 miniITX Motherboard",
      price: 284.99,
      path: "images/parts/motherboard/Gigabyte_X870I_AORUS_PRO_ICE.png",
      limits: {
        [1]: {
          category: "Motherboard Size",
          limit: "miniITX",
        },
        [2]: {
          category: "Socket",
          limit: "AM5",
        },
      },
    },
    [12]: {
      name: "Gigabyte A620I AX",
      desc: "AMD AM5 miniITX Motherboard",
      price: 284.99,
      path: "images/parts/motherboard/Gigabyte_A620I_AX.png",
      limits: {
        [1]: {
          category: "Motherboard Size",
          limit: "miniITX",
        },
        [2]: {
          category: "Socket",
          limit: "AM5",
        },
      },
    },
    [13]: {
      name: "ASRock B550 Phantom Gaming 4",
      desc: "AMD AM4 ATX Motherboard",
      price: 114.99,
      path: "images/parts/motherboard/ASRock_B550_Phantom_Gaming_4.png",
      limits: {
        [1]: {
          category: "Motherboard Size",
          limit: "ATX",
        },
        [2]: {
          category: "Socket",
          limit: "AM4",
        },
      },
    },
    [14]: {
      name: "Gigabyte B550 EAGLE WIFI6",
      desc: "AMD AM4 ATX Motherboard",
      price: 99.99,
      path: "images/parts/motherboard/Gigabyte_B550_EAGLE_WIFI6.png",
      limits: {
        [1]: {
          category: "Motherboard Size",
          limit: "ATX",
        },
        [2]: {
          category: "Socket",
          limit: "AM4",
        },
      },
    },
    [15]: {
      name: "ASRock A520M-HDV",
      desc: "AMD AM4 microATX Motherboard",
      price: 62.99,
      path: "images/parts/motherboard/ASRock_A520M-HDV.png",
      limits: {
        [1]: {
          category: "Motherboard Size",
          limit: "microATX",
        },
        [2]: {
          category: "Socket",
          limit: "AM4",
        },
      },
    },
    [16]: {
      name: "Gigabyte B550M GAMING X WIFI6",
      desc: "AMD AM4 microATX Motherboard",
      price: 104.99,
      path: "images/parts/motherboard/Gigabyte_B550M_GAMING_X_WIFI6.png",
      limits: {
        [1]: {
          category: "Motherboard Size",
          limit: "microATX",
        },
        [2]: {
          category: "Socket",
          limit: "AM4",
        },
      },
    },
    [17]: {
      name: "ASRock B550M-C",
      desc: "AMD AM4 microATX Motherboard",
      price: 109.99,
      path: "images/parts/motherboard/ASRock_B550M-C.png",
      limits: {
        [1]: {
          category: "Motherboard Size",
          limit: "microATX",
        },
        [2]: {
          category: "Socket",
          limit: "AM4",
        },
      },
    },
    [18]: {
      name: "Gigabyte A520I AC",
      desc: "AMD AM4 miniITX Motherboard",
      price: 109.99,
      path: "images/parts/motherboard/Gigabyte_A520I_AC.png",
      limits: {
        [1]: {
          category: "Motherboard Size",
          limit: "miniITX",
        },
        [2]: {
          category: "Socket",
          limit: "AM4",
        },
      },
    },
    [18]: {
      name: "ASUS Z790-Plus TUF Gaming WiFi",
      desc: "Intel LGA 1700 ATX Motherboard",
      price: 219.99,
      path: "images/parts/motherboard/ASUS_Z790-Plus_TUF_Gaming_WiFi_D5.png",
      limits: {
        [1]: {
          category: "Motherboard Size",
          limit: "ATX",
        },
        [2]: {
          category: "Socket",
          limit: "LGA1700",
        },
      },
    },
    [19]: {
      name: "Gigabyte B760I Aorus Pro",
      desc: "Intel LGA 1700 Mini-ITX Motherboard",
      price: 209.99,
      path: "images/parts/motherboard/Gigabyte_B760I_Aorus_Pro.png",
      limits: {
        [1]: {
          category: "Motherboard Size",
          limit: "miniITX",
        },
        [2]: {
          category: "Socket",
          limit: "LGA1700",
        },
      },
    },
    [20]: {
      name: "ASUS Z790 MAX GAMING WIFI7",
      desc: "Intel LGA 1700 ATX Motherboard",
      price: 199.99,
      path: "images/parts/motherboard/ASUS_Z790_MAX_GAMING_WIFI7.png",
      limits: {
        [1]: {
          category: "Motherboard Size",
          limit: "ATX",
        },
        [2]: {
          category: "Socket",
          limit: "LGA1700",
        },
      },
    },
    [21]: {
      name: "MSI B760M-P Pro",
      desc: "Intel LGA 1700 microATX Motherboard",
      price: 109.99,
      path: "images/parts/motherboard/MSI_B760M-P_Pro.png",
      limits: {
        [1]: {
          category: "Motherboard Size",
          limit: "microATX",
        },
        [2]: {
          category: "Socket",
          limit: "LGA1700",
        },
      },
    },
    [22]: {
      name: "ASUS Z890-Creator ProArt WiFi",
      desc: "Intel LGA 1851 ATX Motherboard",
      price: 489.99,
      path: "images/parts/motherboard/ASUS_Z890-Creator_ProArt_WiFi.png",
      limits: {
        [1]: {
          category: "Motherboard Size",
          limit: "ATX",
        },
        [2]: {
          category: "Socket",
          limit: "LGA1851",
        },
      },
    },
    [23]: {
      name: "ASRock Z890 Taichi",
      desc: "Intel LGA 1851 ATX Motherboard",
      price: 459.99,
      path: "images/parts/motherboard/ASRock_Z890_Taichi.png",
      limits: {
        [1]: {
          category: "Motherboard Size",
          limit: "ATX",
        },
        [2]: {
          category: "Socket",
          limit: "LGA1851",
        },
      },
    },
    [24]: {
      name: "Gigabyte Z890 AERO G",
      desc: "Intel LGA 1851 ATX Motherboard",
      price: 299.99,
      path: "images/parts/motherboard/Gigabyte_Z890_AERO_G.png",
      limits: {
        [1]: {
          category: "Motherboard Size",
          limit: "ATX",
        },
        [2]: {
          category: "Socket",
          limit: "LGA1851",
        },
      },
    },
    [25]: {
      name: "Gigabyte Z890 AORUS ELITE",
      desc: "Intel LGA 1851 ATX Motherboard",
      price: 239.99,
      path: "images/parts/motherboard/Gigabyte_Z890_AORUS_ELITE.png",
      limits: {
        [1]: {
          category: "Motherboard Size",
          limit: "ATX",
        },
        [2]: {
          category: "Socket",
          limit: "LGA1851",
        },
      },
    },
    [26]: {
      name: "MSI Z890 Gaming Plus WiFi",
      desc: "Intel LGA 1851 ATX Motherboard",
      price: 189.99,
      path: "images/parts/motherboard/MSI_Z890_Gaming_Plus_WiFi.png",
      limits: {
        [1]: {
          category: "Motherboard Size",
          limit: "ATX",
        },
        [2]: {
          category: "Socket",
          limit: "LGA1851",
        },
      },
    },
    [27]: {
      name: "Gigabyte B860 EAGLE WIFI6E",
      desc: "Intel LGA 1851 ATX Motherboard",
      price: 149.99,
      path: "images/parts/motherboard/Gigabyte_B860_EAGLE_WIFI6E.png",
      limits: {
        [1]: {
          category: "Motherboard Size",
          limit: "ATX",
        },
        [2]: {
          category: "Socket",
          limit: "LGA1851",
        },
      },
    },
    [28]: {
      name: "ASRock Z890M Riptide WIFI",
      desc: "Intel LGA 1851 microATX Motherboard",
      price: 259.99,
      path: "images/parts/motherboard/ASRock_Z890M_Riptide_WIFI.png",
      limits: {
        [1]: {
          category: "Motherboard Size",
          limit: "microATX",
        },
        [2]: {
          category: "Socket",
          limit: "LGA1851",
        },
      },
    },
    [29]: {
      name: "Gigabyte B860M AORUS ELITE WIFI6E ICE",
      desc: "Intel LGA 1851 microATX Motherboard",
      price: 179.99,
      path: "images/parts/motherboard/Gigabyte_B860M_AORUS_ELITE_WIFI6E_ICE.png",
      limits: {
        [1]: {
          category: "Motherboard Size",
          limit: "microATX",
        },
        [2]: {
          category: "Socket",
          limit: "LGA1851",
        },
      },
    },
    [30]: {
      name: "MSI B860M-A PRO WIFI",
      desc: "Intel LGA 1851 microATX Motherboard",
      price: 149.99,
      path: "images/parts/motherboard/MSI_B860M-A_PRO_WIFI.png",
      limits: {
        [1]: {
          category: "Motherboard Size",
          limit: "microATX",
        },
        [2]: {
          category: "Socket",
          limit: "LGA1851",
        },
      },
    },
  },
  cpu: {
    [1]: {
      name: "Intel Core Ultra 9 285K Arrow Lake",
      desc: "24 cores, 24 threads, LGA 1851 socket, 3.7 GHz",
      price: 479.99,
      score: 67474,
      path: "images/parts/cpu/Intel_Core_Ultra_9_285K_Arrow_Lake.png",
      limits: {
        [1]: {
          category: "Socket Type",
          limit: "LGA1851",
        },
        [2]: {
          category: "Memory",
          limit: "DDR5",
        },
      },
    },
    [2]: {
      name: "Intel Core Ultra 7 265K Arrow Lake",
      desc: "20 cores, 20 threads, LGA 1851 socket, 3.9 GHz",
      price: 279.99,
      score: 58789,
      path: "images/parts/cpu/Intel_Core_Ultra_7_265K_Arrow_Lake.png",
      limits: {
        [1]: {
          category: "Socket Type",
          limit: "LGA1851",
        },
        [2]: {
          category: "Memory",
          limit: "DDR5",
        },
      },
    },
    [3]: {
      name: "Intel Core Ultra 5 245K Arrow Lake",
      desc: "14 cores, 14 threads, LGA 1851 socket, 4.2 GHz",
      price: 279.99,
      score: 43425,
      path: "images/parts/cpu/Intel_Core_Ultra_5_245K_Arrow_Lake.png",
      limits: {
        [1]: {
          category: "Socket Type",
          limit: "LGA1851",
        },
        [2]: {
          category: "Memory",
          limit: "DDR5",
        },
      },
    },
    [4]: {
      name: "Intel Core i9-13900K Raptor Lakee",
      desc: "24 cores, 32 threads, LGA 1700 socket, 3.0 GHz",
      price: 729.99,
      score: 58368,
      path: "images/parts/cpu/Intel_Core_i9-13900K_Raptor_Lakee.png",
      limits: {
        [1]: {
          category: "Socket Type",
          limit: "LGA1700",
        },
        [2]: {
          category: "Memory",
          limit: "DDR4",
        },
      },
    },
    [5]: {
      name: "Intel Core i7-14700K Raptor Lake",
      desc: "20 cores, 28 threads, LGA 1700 socket, 3.4 GHz",
      price: 299.99,
      score: 52225,
      path: "images/parts/cpu/Intel_Core_i7-14700K_Raptor_Lake.png",
      limits: {
        [1]: {
          category: "Socket Type",
          limit: "LGA1700",
        },
        [2]: {
          category: "Memory",
          limit: "DDR4",
        },
      },
    },
    [6]: {
      name: "Intel Core i5-14400 Raptor Lake",
      desc: "10 cores, 16 threads, LGA 1700 socket, 2.5 GHz",
      price: 179.99,
      score: 25316,
      path: "images/parts/cpu/Intel_Core_i5-14400_Raptor_Lake.png",
      limits: {
        [1]: {
          category: "Socket Type",
          limit: "LGA1700",
        },
        [2]: {
          category: "Memory",
          limit: "DDR4",
        },
      },
    },
    [7]: {
      name: "Intel Core i5-12600KF Alder Lake",
      desc: "10 cores, 16 threads, LGA 1700 socket, 3.7 GHz",
      price: 159.99,
      score: 27588,
      path: "images/parts/cpu/Intel_Core_i5-12600KF_Alder_Lake.png",
      limits: {
        [1]: {
          category: "Socket Type",
          limit: "LGA1700",
        },
        [2]: {
          category: "Memory",
          limit: "DDR4",
        },
      },
    },
    [8]: {
      name: "Intel Core i5-12400 Alder Lake",
      desc: "6 cores, 12 threads, LGA 1700 socket, 2.5 GHz",
      price: 149.99,
      score: 18793,
      path: "images/parts/cpu/Intel_Core_i5-12400_Alder_Lake.png",
      limits: {
        [1]: {
          category: "Socket Type",
          limit: "LGA1700",
        },
        [2]: {
          category: "Memory",
          limit: "DDR4",
        },
      },
    },
    [9]: {
      name: "AMD Ryzen 7 5800XT Vermeer",
      desc: "8 cores, 16 threads, AM4 socket, 3.8 GHz",
      price: 169.99,
      score: 27996,
      path: "images/parts/cpu/AMD_Ryzen_7_5800XT_Vermeer.png",
      limits: {
        [1]: {
          category: "Socket Type",
          limit: "AM4",
        },
        [2]: {
          category: "Memory",
          limit: "DDR4",
        },
      },
    },
    [10]: {
      name: "AMD Ryzen 5 4500 Renoir",
      desc: "6 cores, 12 threads, AM4 socket, 3.6 GHz",
      price: 59.99,
      score: 16048,
      path: "images/parts/cpu/AMD_Ryzen_5_4500_Renoir.png",
      limits: {
        [1]: {
          category: "Socket Type",
          limit: "AM4",
        },
        [2]: {
          category: "Memory",
          limit: "DDR4",
        },
      },
    },
    [11]: {
      name: "AMD Ryzen 5 5500GT Cezanne",
      desc: "6 cores, 12 threads, AM4 socket, 3.7 GHz",
      price: 119.99,
      score: 18849,
      path: "images/parts/cpu/AMD_Ryzen_5_5500GT_Cezanne.png",
      limits: {
        [1]: {
          category: "Socket Type",
          limit: "AM4",
        },
        [2]: {
          category: "Memory",
          limit: "DDR4",
        },
      },
    },
    [12]: {
      name: "AMD Ryzen 7 5700G Cezanne",
      desc: "8 cores, 16 threads, AM4 socket, 3.8 GHz",
      price: 159.99,
      score: 24360,
      path: "images/parts/cpu/AMD_Ryzen_7_5700G_Cezanne.png",
      limits: {
        [1]: {
          category: "Socket Type",
          limit: "AM4",
        },
        [2]: {
          category: "Memory",
          limit: "DDR4",
        },
      },
    },
    [13]: {
      name: "AMD Ryzen 7 9800X3D",
      desc: "8 cores, 16 threads, AM5 socket, 5.2 GHz",
      price: 399.99,
      score: 39962,
      path: "images/parts/cpu/AMD_Ryzen_7_9800X3D.png",
      limits: {
        [1]: {
          category: "Socket Type",
          limit: "AM5",
        },
        [2]: {
          category: "Memory",
          limit: "DDR5",
        },
      },
    },
    [14]: {
      name: "AMD Ryzen 5 9600X",
      desc: "6 cores, 12 threads, AM5 socket, 3.9 GHz",
      price: 399.99,
      score: 39962,
      path: "images/parts/cpu/AMD_Ryzen_5_9600X.png",
      limits: {
        [1]: {
          category: "Socket Type",
          limit: "AM5",
        },
        [2]: {
          category: "Memory",
          limit: "DDR5",
        },
      },
    },
    [15]: {
      name: "AMD Ryzen 7 7800X3D",
      desc: "8 cores, 16 threads, AM5 socket, 4.2 GHz",
      price: 329.99,
      score: 34295,
      path: "images/parts/cpu/AMD_Ryzen_7_7800X3D.png",
      limits: {
        [1]: {
          category: "Socket Type",
          limit: "AM5",
        },
        [2]: {
          category: "Memory",
          limit: "DDR5",
        },
      },
    },
    [16]: {
      name: "AMD Ryzen 7 9700X",
      desc: "8 cores, 16 threads, AM5 socket, 3.8 GHz",
      price: 279.99,
      score: 37145,
      path: "images/parts/cpu/AMD_Ryzen_7_9700X.png",
      limits: {
        [1]: {
          category: "Socket Type",
          limit: "AM5",
        },
        [2]: {
          category: "Memory",
          limit: "DDR5",
        },
      },
    },
    [17]: {
      name: "AMD Ryzen 7 7700X",
      desc: "8 cores, 16 threads, AM5 socket, 4.5 GHz",
      price: 229.99,
      score: 35603,
      path: "images/parts/cpu/AMD_Ryzen_7_7700X.png",
      limits: {
        [1]: {
          category: "Socket Type",
          limit: "AM5",
        },
        [2]: {
          category: "Memory",
          limit: "DDR5",
        },
      },
    },
    [18]: {
      name: "AMD Ryzen 5 7600X3D",
      desc: "6 cores, 12 threads, AM5 socket, 4.1 GHz",
      price: 199.99,
      score: 25725,
      path: "images/parts/cpu/AMD_Ryzen_5_7600X3D.png",
      limits: {
        [1]: {
          category: "Socket Type",
          limit: "AM5",
        },
        [2]: {
          category: "Memory",
          limit: "DDR5",
        },
      },
    },
    [19]: {
      name: "AMD Ryzen 5 8400F",
      desc: "6 cores, 12 threads, AM5 socket, 4.2 GHz",
      price: 149.99,
      score: 24556,
      path: "images/parts/cpu/AMD_Ryzen_5_8400F.png",
      limits: {
        [1]: {
          category: "Socket Type",
          limit: "AM5",
        },
        [2]: {
          category: "Memory",
          limit: "DDR5",
        },
      },
    },
  },
  cpuCooler: {
    [1]: {
      name: "Corsair NAUTILUS 360 RS",
      desc: "ARGB 360mm All in One Liquid CPU Cooling Kit",
      price: 109.99,
      path: "images/parts/cpuCooler/Corsair_NAUTILUS_360_RS.png",
      limits: {
        [1]: {
          category: "Cooler Type",
          limit: "All-in-One Liquid Cooler",
        },
      },
    },
    [2]: {
      name: "Lian Li Hydroshift II LCD-C 360NF",
      desc: "360mm Fanless All in One Liquid CPU Cooling Kit",
      price: 159.99,
      path: "images/parts/cpuCooler/Lian_Li_Hydroshift_II_LCD-C_360NF.png",
      limits: {
        [1]: {
          category: "Cooler Type",
          limit: "All-in-One Liquid Cooler",
        },
      },
    },
    [3]: {
      name: "NZXT Kraken Elite RGB",
      desc: "360mm All in One Liquid CPU Cooling Kit",
      price: 279.99,
      path: "images/parts/cpuCooler/NZXT_Kraken_Elite_RGB.png",
      limits: {
        [1]: {
          category: "Cooler Type",
          limit: "All-in-One Liquid Cooler",
        },
      },
    },
    [4]: {
      name: "be quiet SILENT LOOP 3",
      desc: "420mm All in One Liquid CPU Cooling Kit",
      price: 174.99,
      path: "images/parts/cpuCooler/be_quiet_SILENT_LOOP_3.png",
      limits: {
        [1]: {
          category: "Cooler Type",
          limit: "All-in-One Liquid Cooler",
        },
      },
    },
    [5]: {
      name: "NZXT Kraken",
      desc: "280mm All in One Liquid CPU Cooling Kit",
      price: 99.99,
      path: "images/parts/cpuCooler/NZXT_Kraken.png",
      limits: {
        [1]: {
          category: "Cooler Type",
          limit: "All-in-One Liquid Cooler",
        },
      },
    },
    [6]: {
      name: "Razer Hanbo Chroma RGB",
      desc: "240mm All in One Water Cooling Kit",
      price: 59.99,
      path: "images/parts/cpuCooler/Razer_Hanbo_Chroma_RGB.png",
      limits: {
        [1]: {
          category: "Cooler Type",
          limit: "All-in-One Liquid Cooler",
        },
      },
    },
    [7]: {
      name: "NZXT Kraken 120",
      desc: "120mm AIO Water Cooling Kit",
      price: 74.99,
      path: "images/parts/cpuCooler/NZXT_Kraken_120.png",
      limits: {
        [1]: {
          category: "Cooler Type",
          limit: "All-in-One Liquid Cooler",
        },
      },
    },
    [8]: {
      name: "be quiet DARK ROCK PRO 5",
      desc: "CPU Air Cooler",
      price: 109.99,
      path: "images/parts/cpuCooler/be_quiet_DARK_ROCK_PRO_5.png",
      limits: {
        [1]: {
          category: "Cooler Type",
          limit: "Air Cooler",
        },
      },
    },
    [9]: {
      name: "Thermalright Phantom Spirit 120 SE",
      desc: "CPU Air Cooler",
      price: 54.99,
      path: "images/parts/cpuCooler/Thermalright_Phantom_Spirit_120_SE.png",
      limits: {
        [1]: {
          category: "Cooler Type",
          limit: "Air Cooler",
        },
      },
    },
    [10]: {
      name: "Thermalright Peerless Assassin 140",
      desc: "CPU Air Cooler",
      price: 59.99,
      path: "images/parts/cpuCooler/Thermalright_Peerless_Assassin_140.png",
      limits: {
        [1]: {
          category: "Cooler Type",
          limit: "Air Cooler",
        },
      },
    },
    [11]: {
      name: "Cooler Master Hyper 212",
      desc: "CPU Air Cooler",
      price: 19.99,
      path: "images/parts/cpuCooler/Cooler_Master_Hyper_212.png",
      limits: {
        [1]: {
          category: "Cooler Type",
          limit: "Air Cooler",
        },
      },
    },
    [12]: {
      name: "be quiet PURE ROCK 3",
      desc: "CPU Air Cooler",
      price: 41.99,
      path: "images/parts/cpuCooler/be_quiet_PURE_ROCK_3.png",
      limits: {
        [1]: {
          category: "Cooler Type",
          limit: "Air Cooler",
        },
      },
    },
    [13]: {
      name: "Noctua NH-D15S Chromax Black",
      desc: "CPU Air Cooler",
      price: 129.99,
      path: "images/parts/cpuCooler/Noctua_NH-D15S_Chromax_Black.png",
      limits: {
        [1]: {
          category: "Cooler Type",
          limit: "Air Cooler",
        },
      },
    },
    [14]: {
      name: "NZXT T120",
      desc: "CPU Air Cooler",
      price: 24.99,
      path: "images/parts/cpuCooler/NZXT_T120.png",
      limits: {
        [1]: {
          category: "Cooler Type",
          limit: "Air Cooler",
        },
      },
    },
  },
  ram: {
    [1]: {
      name: "Patriot Viper Steel",
      desc: "64GB (2 x 32GB), DDR4, 3600MHz, CL18",
      price: 555.99,
      path: "images/parts/ram/Patriot_Viper_Steel_64GB.png",
      limits: {
        [1]: { category: "Memory Type", limit: "DDR4" },
      },
    },
    [2]: {
      name: "Crucial Pro",
      desc: "64GB (2 x 32GB), DDR4, 3200MHz, CL22",
      price: 291.99,
      path: "images/parts/ram/Crucial_Pro_64GB.png",
      limits: {
        [1]: { category: "Memory Type", limit: "DDR4" },
      },
    },
    [3]: {
      name: "Patriot Viper Steel RGB",
      desc: "32GB (2 x 16GB), DDR4, 3600MHz, CL18",
      price: 234.99,
      path: "images/parts/ram/Patriot_Viper_Steel_RGB_32GB.png",
      limits: {
        [1]: { category: "Memory Type", limit: "DDR4" },
      },
    },
    [4]: {
      name: "Kingston FURY Renegade Pro",
      desc: "128GB (4 x 32GB), DDR5, 5600MHz, CL28",
      price: 1699.99,
      path: "images/parts/ram/Kingston_FURY_Renegade_Pro_128GB.png",
      limits: {
        [1]: { category: "Memory Type", limit: "DDR5" },
      },
    },
    [5]: {
      name: "TeamGroup T-Create Master",
      desc: "64GB (4 x 16GB), DDR5, 6400MHz, CL32",
      price: 699.99,
      path: "images/parts/ram/TeamGroup_T-Create_Master_64GB.png",
      limits: {
        [1]: { category: "Memory Type", limit: "DDR5" },
      },
    },
    [6]: {
      name: "TeamGroup T-Create Expert",
      desc: "64GB (2 x 32GB), DDR5, 6000MHz, CL34",
      price: 527.99,
      path: "images/parts/ram/TeamGroup_T-Create_Expert_64GB.png",
      limits: {
        [1]: { category: "Memory Type", limit: "DDR5" },
      },
    },
    [7]: {
      name: "G.Skill Ripjaws M5 Neo Series",
      desc: "32GB (2 x 16GB), DDR5, 6000MHz, CL28",
      price: 419.99,
      path: "images/parts/ram/G.Skill_Ripjaws_M5_Neo_RGB_Series_32GB.png",
      limits: {
        [1]: { category: "Memory Type", limit: "DDR5" },
      },
    },
    [8]: {
      name: "Corsair Dominator Titanium RGB",
      desc: "32GB (2 x 16GB), DDR5, 7000MHz, CL34",
      price: 393.99,
      path: "images/parts/ram/Corsair_Dominator_Titanium_RGB_32GB.png",
      limits: {
        [1]: { category: "Memory Type", limit: "DDR5" },
      },
    },
    [9]: {
      name: "Corsair VENGEANCE RGB",
      desc: "32GB (2 x 16GB), DDR5, 6000MHz, CL36",
      price: 349.99,
      path: "images/parts/ram/Corsair_VENGEANCE_RGB_32GB.png",
      limits: {
        [1]: { category: "Memory Type", limit: "DDR5" },
      },
    },
    [10]: {
      name: "Crucial Pro Overclocking",
      desc: "32GB (2 x 16GB), DDR5, 6400MHz, CL32",
      price: 347.99,
      path: "images/parts/ram/Crucial_Pro_Overclocking_32GB.png",
      limits: {
        [1]: { category: "Memory Type", limit: "DDR5" },
      },
    },
    [11]: {
      name: "G.Skill Flare X5 Series",
      desc: "32GB (2 x 16GB), DDR5, 6000MHz, CL36",
      price: 329.99,
      path: "images/parts/ram/G.Skill_Flare_X5_Series_32GB.png",
      limits: {
        [1]: { category: "Memory Type", limit: "DDR5" },
      },
    },
    [12]: {
      name: "Crucial Pro",
      desc: "32GB (2 x 16GB), DDR5, 6400MHz, CL38",
      price: 321.99,
      path: "images/parts/ram/Crucial_Pro_32GB.png",
      limits: {
        [1]: { category: "Memory Type", limit: "DDR5" },
      },
    },
  },
  ssd: {
    [1]: {
      name: "WD Black SN850P",
      desc: "8TB, 7,200MB/s read, 6,600MB/s write",
      price: 799.99,
      path: "images/parts/ssd/WD_Black_SN850P_8TB.png",
      limits: {
        [1]: {
          category: "Storage Type",
          limit: "NAND NVMe SSD",
        },
      },
    },
    [2]: {
      name: "Crucial T705",
      desc: "4TB, 14,100MB/s read, 12,600MB/s write",
      price: 479.99,
      path: "images/parts/ssd/Crucial_T705_4TB.png",
      limits: {
        [1]: {
          category: "Storage Type",
          limit: "NAND NVMe SSD",
        },
      },
    },
    [3]: {
      name: "Samsung 9100 PRO",
      desc: "4TB, 14,800MB/s read, 13,400MB/s write",
      price: 439.99,
      path: "images/parts/ssd/Samsung_9100_PRO_4TB.png",
      limits: {
        [1]: {
          category: "Storage Type",
          limit: "NAND NVMe SSD",
        },
      },
    },
    [4]: {
      name: "WD Black SN850X",
      desc: "4TB, 7,300MB/s read, 6,600MB/s write",
      price: 399.99,
      path: "images/parts/ssd/WD_Black_SN850X_4TB.png",
      limits: {
        [1]: {
          category: "Storage Type",
          limit: "NAND NVMe SSD",
        },
      },
    },
    [5]: {
      name: "Samsung 870 EVO",
      desc: "4TB, 560MB/s read, 530MB/s write",
      price: 329.99,
      path: "images/parts/ssd/Samsung_870_EVO_4TB.png",
      limits: {
        [1]: {
          category: "Storage Type",
          limit: "Solid State Drive",
        },
      },
    },
    [6]: {
      name: "Samsung 9100 PRO",
      desc: "2TB, 14,700MB/s read, 13,400MB/s write",
      price: 219.99,
      path: "images/parts/ssd/Samsung_9100_PRO_2TB.png",
      limits: {
        [1]: {
          category: "Storage Type",
          limit: "NAND NVMe SSD",
        },
      },
    },
    [7]: {
      name: "SK Hynix Platinum P51",
      desc: "1TB, 13,400MB/s read, 13,400MB/s write",
      price: 189.99,
      path: "images/parts/ssd/SK_Hynix_Platinum_P51_1TB.png",
      limits: {
        [1]: {
          category: "Storage Type",
          limit: "NAND NVMe SSD",
        },
      },
    },
    [8]: {
      name: "Samsung 990 PRO",
      desc: "1TB, 7,450MB/s read, 6,900MB/s write",
      price: 109.99,
      path: "images/parts/ssd/Samsung_990_PRO_1TB.png",
      limits: {
        [1]: {
          category: "Storage Type",
          limit: "NAND NVMe SSD",
        },
      },
    },
    [9]: {
      name: "Inland Performance Plus",
      desc: "1TB, 7,000MB/s read, 5,500MB/s write",
      price: 99.99,
      path: "images/parts/ssd/Inland_Performance_Plus_1TB.png",
      limits: {
        [1]: {
          category: "Storage Type",
          limit: "NAND NVMe SSD",
        },
      },
    },
  },
  gpu: {
    [1]: {
      name: "ASUS RTX 5090 Astral",
      desc: "32GB GDDR7, PCIe 5.0",
      price: 3359.99,
      score: 38849,
      path: "images/parts/gpu/ASUS_NVIDIA_GeForce_RTX_5090.png",
      limits: {
        [1]: { category: "GPU Length", limit: "357mm" },
        [2]: { category: "Power Consumption", limit: "1000W" },
      },
    },
    [2]: {
      name: "ASUS RTX 5080 Astral Dhahab",
      desc: "16GB GDDR7, PCIe 5.0",
      price: 1899.99,
      score: 35901,
      path: "images/parts/gpu/ASUS_NVIDIA_GeForce_RTX_5080_Dhahab.png",
      limits: {
        [1]: { category: "GPU Length", limit: "357mm" },
        [2]: { category: "Power Consumption", limit: "850W" },
      },
    },
    [3]: {
      name: "Gigabyte RTX 5070 Ti AERO",
      desc: "16GB GDDR7, PCIe 5.0",
      price: 859.99,
      score: 32545,
      path: "images/parts/gpu/Gigabyte_NVIDIA_GeForce_RTX_5070_Ti.png",
      limits: {
        [1]: { category: "GPU Length", limit: "340mm" },
        [2]: { category: "Power Consumption", limit: "750W" },
      },
    },
    [4]: {
      name: "Gigabyte RTX 5070 Ti EAGLE SFF",
      desc: "16GB GDDR7, PCIe 5.0",
      price: 819.99,
      score: 32545,
      path: "images/parts/gpu/Gigabyte_RTX_5070_Ti_EAGLE_SFF.png",
      limits: {
        [1]: { category: "GPU Length", limit: "304mm" },
        [2]: { category: "Power Consumption", limit: "750W" },
      },
    },
    [5]: {
      name: "MSI RTX 5070 VANGUARD SOC LAUNCH",
      desc: "12GB GDDR7, PCIe 5.0",
      price: 779.99,
      score: 28837,
      path: "images/parts/gpu/MSI_RTX_5070_VANGUARD_SOC_LAUNCH.png",
      limits: {
        [1]: { category: "GPU Length", limit: "337mm" },
        [2]: { category: "Power Consumption", limit: "650W" },
      },
    },
    [6]: {
      name: "Zotac RTX 5070 Twin Edge",
      desc: "12GB GDDR7, PCIe 5.0",
      price: 549.99,
      score: 28837,
      path: "images/parts/gpu/Zotac_RTX_5070_Twin_Edge.png",
      limits: {
        [1]: { category: "GPU Length", limit: "241mm" },
        [2]: { category: "Power Consumption", limit: "650W" },
      },
    },
    [7]: {
      name: "Gigabyte RTX 5060 Ti Windforce",
      desc: "16GB GDDR7, PCIe 5.0",
      price: 449.99,
      score: 22780,
      path: "images/parts/gpu/Gigabyte_RTX_5060_Ti_Windforce.png",
      limits: {
        [1]: { category: "GPU Length", limit: "208mm" },
        [2]: { category: "Power Consumption", limit: "650W" },
      },
    },
    [8]: {
      name: "Zotac RTX 5060 Ti Twin Edge",
      desc: "16GB GDDR7, PCIe 5.0",
      price: 429.99,
      score: 22780,
      path: "images/parts/gpu/Zotac_RTX_5060_Ti_Twin_Edge.png",
      limits: {
        [1]: { category: "GPU Length", limit: "220mm" },
        [2]: { category: "Power Consumption", limit: "650W" },
      },
    },
    [9]: {
      name: "Zotac RTX 5050 Solo",
      desc: "8GB GDDR6, PCIe 5.0",
      price: 249.99,
      score: 17110,
      path: "images/parts/gpu/Zotac_RTX_5050_Solo.png",
      limits: {
        [1]: { category: "GPU Length", limit: "165mm" },
        [2]: { category: "Power Consumption", limit: "550W" },
      },
    },
    [10]: {
      name: "XFX RX 7900 XTX Speedster MERC 310",
      desc: "24GB GDDR6, PCIe 4.0",
      price: 799.99,
      score: 31295,
      path: "images/parts/gpu/XFX_RX_7900_XTX_Speedster_MERC_310.png",
      limits: {
        [1]: { category: "GPU Length", limit: "343mm" },
        [2]: { category: "Power Consumption", limit: "850W" },
      },
    },
    [11]: {
      name: "ASUS RX 9070 XT TUF Gaming",
      desc: "16GB GDDR6, PCIe 4.0",
      price: 779.99,
      score: 26918,
      path: "images/parts/gpu/ASUS_RX_9070_XT_TUF_Gaming.png",
      limits: {
        [1]: { category: "GPU Length", limit: "330mm" },
        [2]: { category: "Power Consumption", limit: "850W" },
      },
    },
    [12]: {
      name: "PowerColor RX 9070 XT Devil Spectral",
      desc: "16GB GDDR6, PCIe 4.0",
      price: 779.99,
      score: 26918,
      path: "images/parts/gpu/PowerColor_RX_9070_XT_Devil_Spectral.png",
      limits: {
        [1]: { category: "GPU Length", limit: "352mm" },
        [2]: { category: "Power Consumption", limit: "900W" },
      },
    },
    [13]: {
      name: "ASRock RX 7900 XTX Phantom Gaming",
      desc: "24GB GDDR6, PCIe 4.0",
      price: 699.99,
      score: 31295,
      path: "images/parts/gpu/ASRock_RX_7900_XTX_Phantom_Gaming.png",
      limits: {
        [1]: { category: "GPU Length", limit: "330mm" },
        [2]: { category: "Power Consumption", limit: "1000W" },
      },
    },
    [14]: {
      name: "Gigabyte AMD RX 9070 XT ProArt",
      desc: "16GB GDDR6, PCIe 5.0",
      price: 719.99,
      score: 26918,
      path: "images/parts/gpu/Gigabyte_AMD_RX_9070_XT_ProArt.png",
      limits: {
        [1]: { category: "GPU Length", limit: "288mm" },
        [2]: { category: "Power Consumption", limit: "850W" },
      },
    },
    [15]: {
      name: "XFX RX 9070 XT Quicksilver",
      desc: "16GB GDDR6, PCIe 5.0",
      price: 689.99,
      score: 26918,
      path: "images/parts/gpu/XFX_RX_9070_XT_Quicksilver.png",
      limits: {
        [1]: { category: "GPU Length", limit: "355mm" },
        [2]: { category: "Power Consumption", limit: "800W" },
      },
    },
    [16]: {
      name: "ASUS RX 9070 XT Prime",
      desc: "16GB GDDR6, PCIe 5.0",
      price: 649.99,
      score: 26918,
      path: "images/parts/gpu/ASUS_RX_9070_XT_Prime.png",
      limits: {
        [1]: { category: "GPU Length", limit: "313mm" },
        [2]: { category: "Power Consumption", limit: "700W" },
      },
    },
    [17]: {
      name: "ASRock RX 9070 Challenger",
      desc: "16GB GDDR6, PCIe 5.0",
      price: 499.99,
      score: 25373,
      path: "images/parts/gpu/ASRock_RX_9070_Challenger.png",
      limits: {
        [1]: { category: "GPU Length", limit: "290mm" },
        [2]: { category: "Power Consumption", limit: "700W" },
      },
    },
    [18]: {
      name: "Gigabyte RX 9060 XT ProArt",
      desc: "16GB GDDR6, PCIe 5.0",
      price: 399.99,
      score: 20023,
      path: "images/parts/gpu/Gigabyte_RX_9060_XT_ProArt.png",
      limits: {
        [1]: { category: "GPU Length", limit: "281mm" },
        [2]: { category: "Power Consumption", limit: "450W" },
      },
    },
    [19]: {
      name: "Gigabyte RX 9060 XT GAMING",
      desc: "16GB GDDR6, PCIe 5.0",
      price: 379.99,
      score: 20023,
      path: "images/parts/gpu/Gigabyte_RX_9060_XT_GAMING.png",
      limits: {
        [1]: { category: "GPU Length", limit: "281mm" },
        [2]: { category: "Power Consumption", limit: "450W" },
      },
    },
    [20]: {
      name: "Gigabyte RX 7600 XT Gaming",
      desc: "16GB GDDR6, PCIe 4.0",
      price: 359.99,
      score: 17258,
      path: "images/parts/gpu/Gigabyte_RX_7600_XT_Gaming.png",
      limits: {
        [1]: { category: "GPU Length", limit: "281mm" },
        [2]: { category: "Power Consumption", limit: "600W" },
      },
    },
    [21]: {
      name: "XFX RX 7600 Speedster SWFT210",
      desc: "8GB GDDR6, PCIe 4.0",
      price: 249.99,
      score: 16578,
      path: "images/parts/gpu/XFX_RX_7600_Speedster_SWFT210.png",
      limits: {
        [1]: { category: "GPU Length", limit: "241mm" },
        [2]: { category: "Power Consumption", limit: "550W" },
      },
    },
    [22]: {
      name: "PowerColor RX 6600 XT Red Devil",
      desc: "8GB GDDR6, PCIe 4.0",
      price: 179.99,
      score: 16456,
      path: "images/parts/gpu/PowerColor_RX_6600_XT_Red_Devil.png",
      limits: {
        [1]: { category: "GPU Length", limit: "251mm" },
        [2]: { category: "Power Consumption", limit: "600W" },
      },
    },
  },
  psu: {
    [1]: {
      name: "Corsair RM1000x",
      desc: "1000W, 80+ Gold, Fully Modular",
      price: 179.99,
      path: "images/parts/psu/sample.jpg",
      limits: {
        [1]: { category: "Wattage", limit: "1000W" },
      },
    },
    [2]: {
      name: "Seasonic Focus PX-850",
      desc: "850W, 80+ Platinum, Fully Modular",
      price: 159.99,
      path: "images/parts/psu/sample.jpg",
      limits: {
        [1]: { category: "Wattage", limit: "1500W" },
      },
    },
  },
};

// Part Variables
var PartList = {
  case: null,
  motherboard: null,
  cpu: null,
  cpuCooler: null,
  ram: null,
  ssd: null,
  gpu: null,
  psu: null,
  prices: {
    case: 0,
    motherboard: 0,
    cpu: 0,
    cpuCooler: 0,
    ram: 0,
    ssd: 0,
    gpu: 0,
    psu: 0,
  },
};

budgetInput.addEventListener("input", () => {
  updatePrice(budgetInput.value);
});

function updatePrice(budgetValue) {
  if (budgetValue) {
    Budget = Number(budgetValue);
    AvailableBudget = Number(budgetValue);
    allParts.setAttribute("class", "parts primary scrollable");
    budgetOverlay.classList.add("fade-out");
    checkSelection();
  } else {
    allParts.setAttribute("class", "parts primary no-scroll");
    budgetOverlay.setAttribute("class", "parts-overlay");
  }
}

function checkCompatibility(category, partUi) {
  if (category.category == "Motherboard Size") {
    if (ConfigLimits.caseSize == "miniITX") {
      if (
        category.limit == "microATX" ||
        category.limit == "ATX" ||
        category.limit == "E-ATX"
      ) {
        partUi
          .querySelector(".incompatible-overlay")
          .classList.remove("hidden");
        partUi.classList.add("push-to-bottom");
        partUi.querySelector(".incompatible-overlay p").textContent =
          "Incompatible Motherboard Size";
        partUi.querySelector(".part-select").disabled = true;
      }
    } else if (ConfigLimits.caseSize == "microATX") {
      if (category.limit == "ATX" || category.limit == "E-ATX") {
        partUi
          .querySelector(".incompatible-overlay")
          .classList.remove("hidden");
        partUi.classList.add("push-to-bottom");
        partUi.querySelector(".incompatible-overlay p").textContent =
          "Incompatible Motherboard Size";
        partUi.querySelector(".part-select").disabled = true;
      }
    } else if (ConfigLimits.caseSize == "ATX") {
      if (category.limit == "E-ATX") {
        partUi
          .querySelector(".incompatible-overlay")
          .classList.remove("hidden");
        partUi.classList.add("push-to-bottom");
        partUi.querySelector(".incompatible-overlay p").textContent =
          "Incompatible Motherboard Size";
        partUi.querySelector(".part-select").disabled = true;
      }
    }
  } else if (category.category == "Socket Type") {
    if (ConfigLimits.socket != category.limit) {
      partUi.querySelector(".incompatible-overlay").classList.remove("hidden");
      partUi.classList.add("push-to-bottom");
      partUi.querySelector(".incompatible-overlay p").textContent =
        "Incorrect Socket Type";
      partUi.querySelector(".part-select").disabled = true;
    }
  } else if (category.category == "Memory Type") {
    if (ConfigLimits.memoryType != category.limit) {
      partUi.querySelector(".incompatible-overlay").classList.remove("hidden");
      partUi.classList.add("push-to-bottom");
      partUi.querySelector(".incompatible-overlay p").textContent =
        "Incompatible Memory";
      partUi.querySelector(".part-select").disabled = true;
    }
  } else if (category.category == "GPU Length") {
    if (
      Number(ConfigLimits.gpuMaxSize) <= Number(category.limit.slice(0, -2))
    ) {
      partUi.querySelector(".incompatible-overlay").classList.remove("hidden");
      partUi.classList.add("push-to-bottom");
      partUi.querySelector(".incompatible-overlay p").textContent =
        "Incompatible GPU Size";
      partUi.querySelector(".part-select").disabled = true;
    }
  } else if (category.category == "Wattage") {
    if (
      Number(ConfigLimits.wattageNeeded) >= Number(category.limit.slice(0, -1))
    ) {
      partUi.querySelector(".incompatible-overlay").classList.remove("hidden");
      partUi.classList.add("push-to-bottom");
      partUi.querySelector(".incompatible-overlay p").textContent =
        "Insufficient Power";
      partUi.querySelector(".part-select").disabled = true;
    }
  }
}

function updateTotalPrice() {
  let sum = 0;

  for (let key in PartList.prices) {
    sum += PartList.prices[key];
  }
  AvailableBudget = Budget - sum;
  document.getElementById("TotalPrice").textContent = "$" + sum.toFixed(2);
}

function checkSelection() {
  if (PartList.case != null) {
    caseButton.textContent = "Change Component";
    caseButton.disabled = false;
    caseBox.setAttribute("class", "part-box");
  } else {
    caseButton.textContent = "Select Component";
    caseButton.disabled = false;
    caseBox.setAttribute("class", "part-box");
  }

  if (PartList.motherboard != null) {
    motherboardButton.textContent = "Change Component";
    motherboardButton.disabled = false;
    motherboardBox.setAttribute("class", "part-box");
  } else {
    if (PartList.case != null) {
      motherboardButton.textContent = "Select Component";
      motherboardButton.disabled = false;
      motherboardBox.setAttribute("class", "part-box");
    } else {
      motherboardButton.textContent = "Select Component";
      motherboardButton.disabled = true;
      motherboardBox.setAttribute("class", "part-box blurout");
    }
  }

  if (PartList.cpu != null) {
    cpuButton.textContent = "Change Component";
    cpuButton.disabled = false;
    cpuBox.setAttribute("class", "part-box");
  } else {
    if (PartList.motherboard != null) {
      cpuButton.textContent = "Select Component";
      cpuButton.disabled = false;
      cpuBox.setAttribute("class", "part-box");
    } else {
      cpuButton.textContent = "Select Component";
      cpuButton.disabled = true;
      cpuBox.setAttribute("class", "part-box blurout");
    }
  }

  if (PartList.cpuCooler != null) {
    cpuCoolerButton.textContent = "Change Component";
    cpuCoolerButton.disabled = false;
    cpuCoolerBox.setAttribute("class", "part-box");
  } else {
    if (PartList.cpu != null) {
      cpuCoolerButton.textContent = "Select Component";
      cpuCoolerButton.disabled = false;
      cpuCoolerBox.setAttribute("class", "part-box");
    } else {
      cpuCoolerButton.textContent = "Select Component";
      cpuCoolerButton.disabled = true;
      cpuCoolerBox.setAttribute("class", "part-box blurout");
    }
  }

  if (PartList.ram != null) {
    ramButton.textContent = "Change Component";
    ramButton.disabled = false;
    ramBox.setAttribute("class", "part-box");
  } else {
    if (PartList.cpuCooler != null) {
      ramButton.textContent = "Select Component";
      ramButton.disabled = false;
      ramBox.setAttribute("class", "part-box");
    } else {
      ramButton.textContent = "Select Component";
      ramButton.disabled = true;
      ramBox.setAttribute("class", "part-box blurout");
    }
  }

  if (PartList.ssd != null) {
    ssdButton.textContent = "Change Component";
    ssdButton.disabled = false;
    ssdBox.setAttribute("class", "part-box");
  } else {
    if (PartList.ram != null) {
      ssdButton.textContent = "Select Component";
      ssdButton.disabled = false;
      ssdBox.setAttribute("class", "part-box");
    } else {
      ssdButton.textContent = "Select Component";
      ssdButton.disabled = true;
      ssdBox.setAttribute("class", "part-box blurout");
    }
  }

  if (PartList.gpu != null) {
    gpuButton.textContent = "Change Component";
    gpuButton.disabled = false;
    gpuBox.setAttribute("class", "part-box");
  } else {
    if (PartList.ssd != null) {
      gpuButton.textContent = "Select Component";
      gpuButton.disabled = false;
      gpuBox.setAttribute("class", "part-box");
    } else {
      gpuButton.textContent = "Select Component";
      gpuButton.disabled = true;
      gpuBox.setAttribute("class", "part-box blurout");
    }
  }

  if (PartList.psu != null) {
    psuButton.textContent = "Change Component";
    psuButton.disabled = false;
    psuBox.setAttribute("class", "part-box");
  } else {
    if (PartList.gpu != null) {
      psuButton.textContent = "Select Component";
      psuButton.disabled = false;
      psuBox.setAttribute("class", "part-box");
    } else {
      psuButton.textContent = "Select Component";
      psuButton.disabled = true;
      psuBox.setAttribute("class", "part-box blurout");
    }
  }
}

function loadPrompt(part) {
  AvailableBudget += PartList.prices[part];
  PartList.prices[part] = 0;
  PromptTitle.textContent = part.charAt(0).toUpperCase() + part.slice(1);
  for (let individualpart in PartDatabase[part]) {
    let Part = PartDatabase[part][individualpart];

    var NewPart = partTemplate.cloneNode(true);
    NewPart.setAttribute("class", "individual-part primary");
    PromptPartContainer.appendChild(NewPart);

    NewPart.querySelector(".part-info h1").textContent = Part.name;
    NewPart.querySelector(".part-info p").textContent = Part.desc;
    NewPart.querySelector(".part-image").src = Part.path;
    NewPart.querySelector(".part-select").textContent = "$" + Part.price;

    const priceBtn = NewPart.querySelector(".part-select");
    priceBtn.addEventListener("click", () => {
      selectPart(part, Part);
    });

    // Loop limits
    for (let limitId in Part.limits) {
      var limit = Part.limits[limitId];
      var CategoryLimit = NewPart.querySelector(
        ".part-individual-category"
      ).cloneNode(true);
      CategoryLimit.querySelector("h1").textContent = limit.category;
      CategoryLimit.querySelector("p").textContent = limit.limit;
      CategoryLimit.classList.remove("hidden");
      NewPart.querySelector(".part-s-categories").appendChild(CategoryLimit);

      var MobileCategory = NewPart.querySelector(
        ".part-mobile-individual-category"
      ).cloneNode(true);

      MobileCategory.querySelector("h1").textContent = limit.category;
      MobileCategory.querySelector("p").textContent = limit.limit;
      MobileCategory.classList.remove("hidden");

      NewPart.querySelector(".part-row2 .part-s-categories").appendChild(
        MobileCategory
      );

      checkCompatibility(limit, NewPart);
    }

    if (Part.price > AvailableBudget) {
      NewPart.querySelector(".incompatible-overlay").classList.remove("hidden");
      NewPart.querySelector(".incompatible-overlay p").textContent =
        "Out of Budget";
      NewPart.querySelector(".part-select").disabled = true;
    }
  }
  PromptOverlay.classList.add("show");
  PromptContent.classList.remove("hidden");
  ResultsContent.classList.add("hidden");
  attachButtonSounds();
}

function closePrompt() {
  PromptOverlay.classList.remove("show");
  [...PromptPartContainer.children].forEach((child) => {
    if (child !== partTemplate) {
      child.remove();
    }
  });
}

function getFPSfromScore(gameScore, systemScore, standardFPS) {
  var FPS = (gameScore / systemScore) * standardFPS;
  return "~" + Math.trunc(FPS) + " FPS";
}

function loadResults() {
  PromptOverlay.classList.add("show");
  ResultsContent.classList.remove("hidden");
  PromptContent.classList.add("hidden");

  systemScore = (ConfigLimits.gpuScore + ConfigLimits.cpuScore) / 2;

  valorantScore =
    ConfigLimits.gpuScore * gamesRatios.valorant.gpu +
    ConfigLimits.cpuScore * gamesRatios.valorant.cpu;

  robloxScore =
    ConfigLimits.gpuScore * gamesRatios.roblox.gpu +
    ConfigLimits.cpuScore * gamesRatios.roblox.cpu;

  fortniteScore =
    ConfigLimits.gpuScore * gamesRatios.fortnite.gpu +
    ConfigLimits.cpuScore * gamesRatios.fortnite.cpu;

  cyberpunkScore =
    ConfigLimits.gpuScore * gamesRatios.cyberpunk.gpu +
    ConfigLimits.cpuScore * gamesRatios.cyberpunk.cpu;

  ValorantText.textContent = getFPSfromScore(
    valorantScore,
    systemScore,
    gamesRatios.valorant.standardFPS
  );

  RobloxText.textContent = getFPSfromScore(
    robloxScore,
    systemScore,
    gamesRatios.roblox.standardFPS
  );

  FortniteText.textContent = getFPSfromScore(
    fortniteScore,
    systemScore,
    gamesRatios.fortnite.standardFPS
  );

  CyberpunkText.textContent = getFPSfromScore(
    cyberpunkScore,
    systemScore,
    gamesRatios.cyberpunk.standardFPS
  );
}

function selectPart(category, part) {
  // Deletes old parts from previous selection
  [...document.getElementById(category + "Texts").children].forEach((child) => {
    if (
      child !== document.getElementById(category + "Title") &&
      child !== document.getElementById(category + "Desc")
    ) {
      child.remove();
    }
  });

  PartList[category] = part.name;
  document.getElementById(category + "Title").textContent = part.name;
  document.getElementById(category + "Img").src = part.path;
  var Price = document.createElement("h3");
  Price.textContent = "Price: $" + part.price;
  document.getElementById(category + "Texts").appendChild(Price);
  PartList.prices[category] = part.price;

  if (category == "cpu") {
    ConfigLimits.cpuScore = part.score;
  } else if (category == "gpu") {
    ConfigLimits.gpuScore = part.score;
  }

  for (let limitId in part.limits) {
    let limit = part.limits[limitId];
    var Text = document.createElement("h3");
    Text.textContent = limit.category + ": " + limit.limit;
    document.getElementById(category + "Texts").appendChild(Text);

    if (limit.category === "Case Size") {
      ConfigLimits.caseSize = limit.limit;
    } else if (limit.category === "Socket") {
      ConfigLimits.socket = limit.limit;
    } else if (limit.category === "Memory") {
      ConfigLimits.memoryType = limit.limit;
    } else if (limit.category === "GPU Size Limit") {
      ConfigLimits.gpuMaxSize = limit.limit.slice(0, -2);
    } else if (limit.category === "Power Consumption") {
      ConfigLimits.wattageNeeded = limit.limit.slice(0, -1);
    }
  }
  document.getElementById(category + "Desc").classList.add("hidden");

  if (category == "psu") {
    testButton.disabled = false;
  }

  updateTotalPrice();
  playSound(installSounds[category]);
  closePrompt();
  checkSelection();
}

function playSound(src) {
  var audio = new Audio(src);
  audio.play();
}

function attachButtonSounds() {
  const buttons = document.querySelectorAll("button");

  buttons.forEach((btn) => {
    btn.onmouseenter = () => {
      if (!btn.disabled) {
        playSound(sounds.hover);
      }
    };

    btn.onmouseleave = () => {
      if (!btn.disabled) {
        playSound(sounds.leave);
      }
    };

    btn.onmousedown = () => {
      if (!btn.disabled) {
        playSound(sounds.click);
      }
    };
  });
}

attachButtonSounds();
