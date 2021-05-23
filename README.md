# instructions to run the application

1. clone the project 

e.g git clone https://github.com/pawanjangid24/notifiication_component.git

2. install all the depenendencies

npm install

3. create input.txt file

e.g 

name Peter Johnson
time 2021-01-01T10:10:10
source web
value 1000
items 'machine,fridge,tv'
delivery 2021-02-02


4. to insert the order into db 

./bin/run.bat

5. to check the event listener 

node src/notification.js