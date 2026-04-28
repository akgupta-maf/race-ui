import bahrainFlag from '../assets/flags/bahrain_flag.webp';
import egyptFlag from '../assets/flags/egypt_flag.webp';
import georgiaFlag from '../assets/flags/georgia_flag.webp';
import jordanFlag from '../assets/flags/jordan_flag.webp';
import kenyaFlag from '../assets/flags/kenya_flag.webp';
import ksaFlag from '../assets/flags/ksa_flag.webp';
import kuwaitFlag from '../assets/flags/kuwait_flag.webp';
import omanFlag from '../assets/flags/oman_flag.webp';
import qatarFlag from '../assets/flags/qatar_flag.webp';
import uaeFlag from '../assets/flags/uae_flag.webp';

const countryFlagMap: Record<string, string> = {
  EGYPT: egyptFlag,
  GEORGIA: georgiaFlag,
  JORDAN: jordanFlag,
  KENYA: kenyaFlag,
  KSA: ksaFlag,
  KUWAIT: kuwaitFlag,
  OMAN: omanFlag,
  QATAR: qatarFlag,
  UAE: uaeFlag,
  BAHRAIN: bahrainFlag,
};

export const getCountryFlag = (countryName: string): string | undefined =>
  countryFlagMap[countryName.toUpperCase()];
