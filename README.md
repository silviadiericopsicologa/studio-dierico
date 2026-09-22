# Studio Dierico

Sito professionale di **Silvia Dierico**, pubblicato tramite GitHub Pages.

## Sito online

https://silviadierico.com/

## Struttura

Il sito è realizzato in HTML, CSS e JavaScript e include:

- Home;
- pagina dedicata a PdT Storytelling Cards;
- Privacy Policy;
- sitemap.xml e robots.txt;
- favicon e web manifest;
- pagina 404;
- modulo contatti protetto da controlli anti-spam;
- pagina di conferma invio;
- configurazione per dominio custom tramite `CNAME`.

## Dominio

Dominio principale:

`silviadierico.com`

Il file `CNAME` deve rimanere nel repository per mantenere il collegamento con GitHub Pages.

## Modulo contatti

Il modulo usa FormSubmit e invia a:

`silviadierico.psicologa@gmail.com`

Nel modulo è presente l'indicazione di non inviare dati clinici o sanitari. Dopo una nuova configurazione o modifica dell'indirizzo destinatario può essere richiesta una conferma via email da FormSubmit.

## Sicurezza

Il repository contiene anche `SICUREZZA-SETUP.txt` con le impostazioni consigliate lato Cloudflare/GitHub.

Non inserire mai nel repository pubblico:

- password;
- API key;
- token;
- credenziali account;
- dati personali non destinati alla pubblicazione.

## Pubblicazione / aggiornamento

1. Scompattare lo ZIP.
2. Copiare **tutti i file e le cartelle** nella root del repository GitHub.
3. Sostituire i file esistenti.
4. Fare commit/push.
5. Attendere il deploy di GitHub Pages.
6. Verificare il sito e, se necessario, fare un refresh forzato (`Ctrl + F5`).

## SEO

Sono presenti:

- canonical;
- meta title e description;
- sitemap.xml;
- robots.txt;
- favicon per browser e risultati di ricerca.

Dopo modifiche importanti alle pagine è possibile richiedere una nuova scansione tramite Google Search Console.

## Collegamento PdT

Il sito collega il progetto PdT al dominio ufficiale:

https://pdtstorytellingcards.com/

## Nota privacy

La Privacy Policy deve essere aggiornata se vengono aggiunti nuovi servizi esterni, analytics, newsletter, prenotazioni online o altre funzionalità che trattano dati personali.
