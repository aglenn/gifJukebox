from autobahn.twisted.websocket import WebSocketServerProtocol, WebSocketServerFactory
from twisted.web import server, resource
from twisted.internet import reactor
import json
import time

class SocketProtocol(WebSocketServerProtocol):

   def onConnect(self, request):
      print("Client connecting: {0}".format(request.peer))
      sender = self;

   def onOpen(self):
      print("WebSocket connection open.")

   def onMessage(self, payload, isBinary):
      print("Message received: {0}".format(payload.decode('utf8')))

      self.sendMessage(json.dumps({"url":"http://alexwglenn.com/brady/gifs/Alex.gif"}), False);

   def onClose(self, wasClean, code, reason):
      print("WebSocket connection closed: {0}".format(reason))

   def blah():
      print("Blah")

class WebResource(resource.Resource):
    isLeaf = True
    def render_GET(self, request):
        return "gifFactory"
    def render_POST(self, request):
      return json.dumps({"status":"1"})


if __name__ == '__main__':

   import sys

   from twisted.python import log
   from twisted.internet import reactor

   log.startLogging(sys.stdout)

   factory = WebSocketServerFactory("ws://localhost:9000", debug = False)
   factory.protocol = SocketProtocol
   factory.protocol.blah();
   
   site = server.Site(WebResource())

   reactor.listenTCP(8080, site)
   reactor.listenTCP(9000, factory)
   reactor.run()