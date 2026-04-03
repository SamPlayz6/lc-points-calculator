// CAO Round 1 cutoff points (2025 data)
// Source: publicly available CAO data
// Note: Points change yearly. HPAT/portfolio courses marked with requirements.

export interface CAOCourse {
  code: string;
  name: string;
  college: string;
  points: number;
  note?: string;
}

export const CAO_COURSES: CAOCourse[] = [
  // UCD
  { code: 'DN100', name: 'Medicine', college: 'UCD', points: 743, note: 'HPAT required' },
  { code: 'DN150', name: 'Engineering', college: 'UCD', points: 508 },
  { code: 'DN200', name: 'Science', college: 'UCD', points: 460 },
  { code: 'DN201', name: 'Computer Science', college: 'UCD', points: 554 },
  { code: 'DN230', name: 'Actuarial & Financial Studies', college: 'UCD', points: 601 },
  { code: 'DN250', name: 'Commerce', college: 'UCD', points: 566 },
  { code: 'DN261', name: 'Business & Law', college: 'UCD', points: 554 },
  { code: 'DN500', name: 'Arts', college: 'UCD', points: 358 },
  { code: 'DN510', name: 'Social Science', college: 'UCD', points: 446 },
  { code: 'DN600', name: 'Law', college: 'UCD', points: 566 },
  { code: 'DN700', name: 'Agricultural Science', college: 'UCD', points: 414 },
  { code: 'DN710', name: 'Veterinary Medicine', college: 'UCD', points: 570 },

  // TCD (Trinity)
  { code: 'TR001', name: 'Arts, Humanities & Social Sciences', college: 'TCD', points: 403 },
  { code: 'TR002', name: 'Law', college: 'TCD', points: 566 },
  { code: 'TR004', name: 'Law and Business', college: 'TCD', points: 555 },
  { code: 'TR027', name: 'Business Studies', college: 'TCD', points: 566 },
  { code: 'TR031', name: 'Economic and Social Studies', college: 'TCD', points: 531 },
  { code: 'TR032', name: 'Computer Science', college: 'TCD', points: 554 },
  { code: 'TR035', name: 'Engineering', college: 'TCD', points: 508 },
  { code: 'TR052', name: 'Medicine', college: 'TCD', points: 743, note: 'HPAT required' },
  { code: 'TR060', name: 'Science', college: 'TCD', points: 475 },
  { code: 'TR071', name: 'Dental Science', college: 'TCD', points: 613, note: 'HPAT required' },
  { code: 'TR073', name: 'Pharmacy', college: 'TCD', points: 555 },

  // UCC
  { code: 'CK101', name: 'Arts', college: 'UCC', points: 312 },
  { code: 'CK201', name: 'Commerce', college: 'UCC', points: 480 },
  { code: 'CK301', name: 'Law (BCL)', college: 'UCC', points: 498 },
  { code: 'CK401', name: 'Computer Science', college: 'UCC', points: 481 },
  { code: 'CK402', name: 'Science', college: 'UCC', points: 426 },
  { code: 'CK404', name: 'Biological & Chemical Sciences', college: 'UCC', points: 436 },
  { code: 'CK502', name: 'Nursing (General)', college: 'UCC', points: 390 },
  { code: 'CK600', name: 'Engineering', college: 'UCC', points: 426 },
  { code: 'CK608', name: 'Electrical & Electronic Engineering', college: 'UCC', points: 388 },
  { code: 'CK700', name: 'Medicine', college: 'UCC', points: 743, note: 'HPAT required' },
  { code: 'CK710', name: 'Dentistry', college: 'UCC', points: 613, note: 'HPAT required' },
  { code: 'CK720', name: 'Pharmacy', college: 'UCC', points: 546 },

  // NUI Galway (University of Galway)
  { code: 'GY101', name: 'Arts', college: 'University of Galway', points: 302 },
  { code: 'GY201', name: 'Commerce', college: 'University of Galway', points: 442 },
  { code: 'GY250', name: 'Corporate Law', college: 'University of Galway', points: 451 },
  { code: 'GY301', name: 'Science', college: 'University of Galway', points: 390 },
  { code: 'GY350', name: 'Computer Science & IT', college: 'University of Galway', points: 426 },
  { code: 'GY401', name: 'Engineering', college: 'University of Galway', points: 426 },
  { code: 'GY501', name: 'Medicine', college: 'University of Galway', points: 743, note: 'HPAT required' },
  { code: 'GY503', name: 'Nursing', college: 'University of Galway', points: 380 },

  // DCU
  { code: 'DC004', name: 'Education (Primary Teaching)', college: 'DCU', points: 516 },
  { code: 'DC110', name: 'Business Studies', college: 'DCU', points: 462 },
  { code: 'DC121', name: 'Computer Applications', college: 'DCU', points: 508 },
  { code: 'DC126', name: 'Communication Studies', college: 'DCU', points: 542 },
  { code: 'DC133', name: 'Global Business (France)', college: 'DCU', points: 508 },
  { code: 'DC155', name: 'Analytical Chemistry', college: 'DCU', points: 390 },
  { code: 'DC171', name: 'Actuarial Mathematics', college: 'DCU', points: 554 },
  { code: 'DC197', name: 'Psychology', college: 'DCU', points: 554 },
  { code: 'DC235', name: 'Mechatronic Engineering', college: 'DCU', points: 414 },
  { code: 'DC455', name: 'Nursing (General)', college: 'DCU', points: 380 },

  // University of Limerick
  { code: 'LM029', name: 'Law Plus', college: 'UL', points: 455 },
  { code: 'LM048', name: 'Business Studies', college: 'UL', points: 409 },
  { code: 'LM076', name: 'Engineering', college: 'UL', points: 380 },
  { code: 'LM098', name: 'Science', college: 'UL', points: 365 },
  { code: 'LM099', name: 'Pharmaceutical & Industrial Chemistry', college: 'UL', points: 390 },
  { code: 'LM110', name: 'Medicine', college: 'UL', points: 743, note: 'HPAT required' },
  { code: 'LM121', name: 'Computer Science', college: 'UL', points: 436 },

  // Maynooth University
  { code: 'MH101', name: 'Arts', college: 'Maynooth University', points: 300 },
  { code: 'MH201', name: 'Science', college: 'Maynooth University', points: 380 },
  { code: 'MH401', name: 'Computer Science', college: 'Maynooth University', points: 446 },
  { code: 'MH402', name: 'Computer Science & Software Engineering', college: 'Maynooth University', points: 462 },
  { code: 'MH501', name: 'Law', college: 'Maynooth University', points: 462 },
  { code: 'MH601', name: 'Business', college: 'Maynooth University', points: 370 },
  { code: 'MH802', name: 'Education (Primary Teaching)', college: 'Maynooth University', points: 498 },

  // TU Dublin
  { code: 'TU800', name: 'Business', college: 'TU Dublin', points: 282 },
  { code: 'TU810', name: 'Engineering (Common Entry)', college: 'TU Dublin', points: 300 },
  { code: 'TU840', name: 'Architecture', college: 'TU Dublin', points: 320 },
  { code: 'TU856', name: 'Computer Science', college: 'TU Dublin', points: 406 },
  { code: 'TU863', name: 'Computing (Infrastructure)', college: 'TU Dublin', points: 282 },

  // MTU (Munster TU)
  { code: 'MT100', name: 'Business', college: 'MTU Cork', points: 253 },
  { code: 'MT105', name: 'Computer Science', college: 'MTU Cork', points: 326 },
  { code: 'MT510', name: 'Mechanical Engineering', college: 'MTU Cork', points: 268 },
  { code: 'MT707', name: 'Nursing (General)', college: 'MTU Cork', points: 390 },
  { code: 'MT800', name: 'Software Development', college: 'MTU Cork', points: 310 },

  // SETU (South East TU)
  { code: 'WD101', name: 'Business Studies', college: 'SETU Waterford', points: 242 },
  { code: 'WD119', name: 'Accounting', college: 'SETU Waterford', points: 268 },
  { code: 'WD160', name: 'Computing', college: 'SETU Waterford', points: 300 },
  { code: 'WD180', name: 'Engineering', college: 'SETU Waterford', points: 268 },
  { code: 'WD187', name: 'Pharmaceutical Science', college: 'SETU Waterford', points: 330 },

  // ATU (Atlantic TU)
  { code: 'GA180', name: 'Business', college: 'ATU Galway', points: 232 },
  { code: 'GA278', name: 'Computing & Digital Media', college: 'ATU Galway', points: 268 },
  { code: 'GA480', name: 'Engineering', college: 'ATU Galway', points: 260 },
  { code: 'GA681', name: 'Science', college: 'ATU Galway', points: 254 },

  // RCSI
  { code: 'RC001', name: 'Medicine', college: 'RCSI', points: 743, note: 'HPAT required' },
  { code: 'RC002', name: 'Pharmacy', college: 'RCSI', points: 538 },
  { code: 'RC003', name: 'Physiotherapy', college: 'RCSI', points: 578 },
];

// All unique colleges for filtering
export const COLLEGES = [...new Set(CAO_COURSES.map(c => c.college))].sort();
