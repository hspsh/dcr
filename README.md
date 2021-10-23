# DynamicCodeRenderer

## Co

DynamicCodeRenderer to serwis, który z kodu renderuje obrazki.
Wykorzystujemy go podobnie jak etherpad (pad.hsp.sh) wpisując do niego tekst pod danym url (/p/$nazwa_pliku).
Różnica mieści się w tym, że pod innym url (/i/$nazwa_pliku) mieści się serwis, który generuje z tekstu plik svg.
Do generacji takich obrazków na razie będizemy wykorzystywać Graphviza, który generuje z kodu grafy (https://graphviz.org/).

## Rationale

Mnóstwo rzeczy zapisuję jako grafy.
Problem w tym, że męczące jest za każdym razem wklejać ten graf do jakiegoś dokumentu.
Dlatego wolałbym, by graf był pod jakimś linkiem, którego nie muszę zmieniać, a wystarczy, że zmienie do niego kod.
Po zmianie kodu, obrazek pod linkiem powinien się zmienić.

## Stories (https://www.agilealliance.org/glossary/user-stories/)

- Kiedy wejdę na główną strone, to wyświetli mi się ekran z inputem tekstu, gdzie wpisując "obrazek", przeniesie mnie do edytora tekstowego na adresie '/p/obrazek'
- Będąc na adresie '/p/obrazek' wpiszę tekst, który jest poprawnym skryptem graphviza i po zapisie, to przechodząc na '/i/obrazek' wyświetli mi się obrazek
- Jeżeli na adresie '/p/obrazek' wpiszę niepoprawny skrypt, to na adresie '/i/obrazek' dostanę status 500
- Jeżeli na adresie '/p/nieobrazek' nie ma obrazka, to dostanę status 400

## Wskazówki

- Backend: Na backendzie rozdzielcie odpowiedzialności na controller, service, repository
- Backend: Python: Flask || NodeJS: ExpressJS
- Frontend: Jeżeli chcecie się bawić z reactem, to warto spróbować wykorzystać NextJS - ten projekt jednak jest dość mały na to
