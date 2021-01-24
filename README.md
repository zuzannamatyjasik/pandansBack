# PANDANS BACKEND
Repozytorium REST API używanego jako backend do frontendu strony "PANDANS". Strona kataloguje polskie firmy, które wytwarzają rózne produkty.

API łączy się z bazą danych MongoDB w celu:
* Dodawania, usuwania, zmieniania i wyświetlania dodanych sklepów
* Dodawania, usuwania i przeglądania przesłanych wiadomości
* Logowania użytkowników przy użyciu JWT
* Binarne zapisywanie zdjęć do bazy MongoDB (Multer)

Repozytorium frontendu: [Pandans Frontend](https://github.com/zuzannamatyjasik/pandansFront)

## **Użyte technologie**
* Node.js
* Express
* MongoDB
* JWT

## **Użyte biblioteki**
* bcrypt
* body-parser
* cors
* express
* jsonwebtoken
* mongoose
* morgan
* multer

## **REST API - Sklepy**
1. Wyświetł wszystkie sklepy

`GET /shops` 

### Odpowiedź API:

    {
        wiadomosc: "Lista wszystkich sklepów",
        info: {<TABLICA WSZYSTKICH SKLEPÓW>},
    }

2. Wyświetł jeden sklep o {id}

`GET /shops/{id}` 

### Odpowiedź API:

    {
        wiadomosc: "Szczegoly sklepu {id}",
        info: {<DANE WYBRANEGO SKLEPU>},
    }

3. Dodanie nowego sklepu  (**ścieżka wymaga autoryzacji**)

`POST /shops` 

### Odpowiedź API:

    {
        wiadomosc: "Dodano nowy sklep",
        info: {<PRZESŁANE DANE>},
    }

4. Aktualizacja sklepu o {id} (**ścieżka wymaga autoryzacji**)

`PATCH /shops/{id}` 

### Odpowiedź API:

    {
        wiadomosc: "Zmiana sklepu {id}",
        info: {<ZAKTUALIZOWANE DANE SKLEPU>},
    }

5. Usunięcie sklepu o {id}  (**ścieżka wymaga autoryzacji**)

`DELETE /shops/{id}` 

### Odpowiedź API:

    {
        wiadomosc: "Usuniecie sklepu {id}",
        info: {<DANE USUNIĘTEGO SKLEPU>},
    }

## **REST API - Użytkownik**

1. Rejestracja
   
`POST /users/signup` 

### Odpowiedź API:

    {
        wiadomosc: "Stworzono nowego uzytkownika",
    }
1. Logowanie

`POST /users/login` 

### Odpowiedź API:

    {
        wiadomosc: "Zalogowano użytkownika",
        token: <TOKEN UŻYTKOWNIKA>,
    }

3. Sprawdźanie tokena

`DELETE /users/check` 

### Odpowiedź API:

    {
        valid: true | false,
    }

## Obsługa błędów
* Zwraca status 404, gdy ścieżka jest niepoprawna
* Zwraca status 500, gdy operacja się nie powiodła
* Zwraca status 401, gdy została wykonana operacja wymagająca autoryzacji, bez podania tokena