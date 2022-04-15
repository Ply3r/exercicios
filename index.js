function getStrInfo(passport) {
  const itens = passport.split('\n');
  const newObj = {};

  itens.forEach((item) => {
    const [key, value] = item.split(': ');
    newObj[key] = value
  })

  return newObj;
}

class Validations {
  static validatePassport(entrant) {
    const keys = Object.keys(entrant);

    const includesPassport = keys.includes('passport');
    if (!includesPassport) {
      throw new Error('Entry denied: missing required passport.')
    }

    const passportInfo = getStrInfo(entrant.passport);

    const date = new Date(passportInfo.EXP);
    const limitDate = new Date('1982.11.22')
    const isExpired = date < limitDate;

    if (isExpired) {
      throw new Error('Entry denied: passport expired.')
    }
  }

  static validateMismatch(entrant) {
    const passportInfo = getStrInfo(entrant.passport);
    const values = Object.values(entrant);

    values.forEach((str) => {
      const info = getStrInfo(str);
      
      const entriesPassport = Object.entries(passportInfo)
      const entriesStr = Object.entries(info);
      
      const matchInfo = entriesPassport.find(([keyP, valueP]) => {
        const result = entriesStr.find(([keyV]) => keyP === keyV);

        if (result) {
          const [_keyV, valueV] = result;
          return valueP !== valueV;
        }

        return false;
      })

      if (matchInfo) {
        const treatedValue = matchInfo[0].replace(/[\W]+/gm, '');
        throw new Error(`Detainment: ${treatedValue} number mismatch.`)
      }
    })
  }
}

class Inspector {
  constructor() {
    this._rules = [];
    this._allowedNations = [];
    this._deniedNations = [];
    this._citizensRequired = [];
    this._criminals = [];
  }

  addNations(rule, allow) {
    const regex = new RegExp(' citizens of ', 'gm');
    const [_k, values] = rule.split(regex);

    const arrValues = values.split(', ');
    if (allow) {
      this._allowedNations = [...arrValues]
      return;
    }

    this._deniedNations = [...arrValues];
  }

  checkRules() {
    const rules = this._rules;

    rules.forEach((rule) => {
      const matchAllowed = new RegExp('Allow citizens of ');
      const matchDenied = new RegExp('Deny citizens of ');
      const citizensReq = new RegExp('Citizens of ');
      const notRequire = new RegExp('Entrants no longer require ');
      const wanted = new RegExp('Wanted by the State: ');

      
      if(matchAllowed.test(rule)) {
        this.addNations(rule, true)
      }

      if(matchDenied.test(rule)) {
        this.addNations(rule, false)
      }
        

      if(citizensReq.test(rule)) {

      }
        

      if(notRequire.test(rule)) {

      }
        

      if(wanted.test(rule)) {

      }
    });
  }

  receiveBulletin(bulletin) {
    const rules = bulletin.split('\n');
    this._rules = rules;
    this.checkRules();
  }

  validations(entrant) {
    Validations.validatePassport(entrant);
    Validations.validateMismatch(entrant);
  }

  inspect(entrant) {
    try {
      this.validations(entrant);

      const passportInfo = getStrInfo(entrant.passport);
      return passportInfo.NATION === 'Arstotzka' ? 'Glory to Arstotzka.' : 'Cause no trouble.'
    } catch (err) {
      return err.message
    }
  }
}

const teste = new Inspector();

const joseth = {
  passport:'ID#: WK9XA-LKM0Q\nNATION: United Federation\nNAME: Dolanski, Roman\nDOB: 1933.01.01\nSEX: M\nISS: Shingleton\nEXP: 1983.05.12',
  grant_of_asylum: 'NAME: Dolanski, Roman\nNATION: United Federation\nID#: WK9XA-PKM0Q\nDOB: 1933.01.01\nHEIGHT: 176cm\nWEIGHT: 71kg\nEXP: 1983.09.20'
}

teste.receiveBulletin('Entrants require passport\nAllow citizens of Arstotzka, Obristan');
console.log(teste.inspect(joseth));

console.log(teste);
