export const getNomeInvestimento = (ticker) => {
  let nome = "";
  switch (ticker) {
    case "MCFE1":
      nome = "MR COFFEE";
      break;

    case "PETR4":
      nome = "PETROBRAS PN";
      break;
    case "VALE3":
      nome = "Vale";
      break;
    case "JBSS3":
      nome = "JBS";
      break;
    case "CASH3":
      nome = "MELIUZ";
      break;
    case "ELON":
      nome = "Dogelon Mars";
      break;
    case "DENT":
      nome = "Dent";
      break;
    case "SHIB":
      nome = "SHIBA INU";
      break;
    case "VTHO":
      nome = "VeThor Token";
      break;
    case "REEF":
      nome = "Reef";
      break;
    case "FFTL":
      nome = "FUNDO FATEC LINS";
      break;
    case "CHMP":
      nome = "CONJ HAB MONZALEL PAZGUETO";
      break;
    case "EDES":
      nome = "EDIFICIO DOS DESENVOLVEDORES";
      break;
    case "CGER":
      nome = "CONGLOMERADO GAMERS";
      break;
    case "JBSI":
      nome = "JBS INSTALACOES";
      break;

    default:
      nome = "";
      break;
  }

  return nome;
};
