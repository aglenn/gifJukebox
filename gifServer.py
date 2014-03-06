from autobahn.twisted.websocket import WebSocketServerProtocol, WebSocketServerFactory
import json
import time

class MyServerProtocol(WebSocketServerProtocol):

   def onConnect(self, request):
      print("Client connecting: {0}".format(request.peer))

   def onOpen(self):
      print("WebSocket connection open.")

   def onMessage(self, payload, isBinary):
      print("Message received: {0}".format(payload.decode('utf8')))

      self.sendMessage(json.dumps({"url":"http://alexwglenn.com/brady/gifs/Alex.gif"}), False);

   def onClose(self, wasClean, code, reason):
      print("WebSocket connection closed: {0}".format(reason))



if __name__ == '__main__':

   import sys

   from twisted.python import log
   from twisted.internet import reactor

   log.startLogging(sys.stdout)

   factory = WebSocketServerFactory("ws://localhost:9000", debug = False)
   factory.protocol = MyServerProtocol

   reactor.listenTCP(9000, factory)
   reactor.run()