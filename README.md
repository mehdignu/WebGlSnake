# WebGlSnake
WebGl with three.js snake Spiel für meine Computer Graphik Veranstaltung


## Beschreibung des Spiels ##

Das Spiel besteht aus 3 Levels:

1 Level: Das Snake bewegt sich auf ein normales Grid und muss 4 Punkte Sammeln vor dem Ablauf der Zeit um zu dem Nächsten Level zu erreichen, das Snake muss den Grid nicht verlassen. die Punkte sind Diamonds die von custom vertices gestaltet sind und ihre Farbe wird von einem selbst geschriebenen shader manipuliert.

2 Level: Das Snake bewegt sich auf dem selben grid aber darunter habe ich ein selbst geschrieben shader verwendet um Wasser Effekt Bewegung zu stimulieren durch die sinus Funktion. Das Wasser Höhe wird sich auch mit dem Ablauf Zeit erhöhen, sodass nach bestimmte Sekunden das Snake nicht mehr sichtbar wird was das Spiel schwieriger macht.

3 Level: das Snake muss die Punkte sammeln aber auch die Polyhedron nicht anfassen sondern wird der Spieler verlieren, und das ist das schwierigste Level.

ich habe auch Phong shading benutzt die vom Three.js bereitgestellt ist um die Szene zu beleuchten.
das Gesamte Projekt ist mit WebGl + Three.js gemacht.

## technologies ##
* WebGl
* Threee.js
