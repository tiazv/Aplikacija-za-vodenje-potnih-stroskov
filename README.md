# Aplikacija za vodenje stroškov

Aplikacija za vodenje potnih stroškov **Stroški.si**, omogoča beleženje in pregled potnih stroškov uporabnikov. Vključuje uporabniški vmesnik, napisan v *React.js* v jeziku *Typescript* in backend v *Express.js*. Podatki so shranjeni v *Firebase* podatkovni bazi.

Aplikacija za vodenje potnih stroškov ponuja funkcionalnosti za učinkovito upravljanje potnih stroškov, z ločenimi pravicami za dva tipa oseb:

- **Delavec** ima dostop do funkcij dodajanja, urejanja in brisanja stroškov, vendar lahko vidi in ureja le svoje stroške. Tako je omogočeno, da delavec beleži in spremlja le svoje podatke, kar zagotavlja varnost in zasebnost v aplikaciji.
- **Uporabnik** lahko stroške samo pregleduje in nima možnosti urejanja ali dodajanja novih stroškov. Dostop ima do ogleda potnih stroškov vseh delavcev. Ta funkcionalnost omogoča dostop do podatkov za pregled brez tveganja nenamernih sprememb.

Aplikacija vključuje tudi *seznam vseh stroškov*, kjer lahko uporabniki kliknejo posamezen strošek za ogled podrobnosti, kot so opis, vsota stroška in kilometrina. Poleg tega lahko uporabnik klikne na ime osebe, povezane s stroškom, kar omogoča prikaz vsote vseh stroškov te osebe, kar olajša sledenje celotnim stroškom.

Za boljšo preglednost potnih stroškov, aplikacija omogoča *filtriranje stroškov po mesecih in letih*, kar poenostavi analizo in iskanje določenih stroškov v določenem časovnem obdobju.

https://vodenjepotnihstroskov-e3174.web.app/
https://backend-aplikacija-za-vodenje-potnih-stroskov-4tbnhhztp.vercel.app/