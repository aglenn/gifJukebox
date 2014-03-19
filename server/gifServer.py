from autobahn.twisted.websocket import WebSocketServerProtocol, WebSocketServerFactory
from twisted.web import server, resource
from twisted.internet import reactor
import json
import time
import os

class SocketProtocol(WebSocketServerProtocol):

   def onConnect(self, request):
      print("Client connecting: {0}".format(request.peer))
      sender = self;

   def onOpen(self):
      print("WebSocket connection open.")
      self.factory.register(self)

   def onMessage(self, payload, isBinary):
      print("Message received: {0}".format(payload.decode('utf8')))

      self.sendMessage(json.dumps({"url":"http://alexwglenn.com/brady/gifs/Alex.gif"}), False);

   def onClose(self, wasClean, code, reason):
      print("WebSocket connection closed: {0}".format(reason))
      self.factory.unregister(self);

class PostableSocketFactory(WebSocketServerFactory):

   def __init__(self, url, debug = False, debugCodePaths = False):
      WebSocketServerFactory.__init__(self, url, debug = debug, debugCodePaths = debugCodePaths)
      self.clients = []

   def register(self, client):
      if not client in self.clients:
         print("registered client {}".format(client.peer))
         self.clients.append(client)

   def unregister(self, client):
      if client in self.clients:
         print("unregistered client {}".format(client.peer))
         self.clients.remove(client)

   def broadcast(self, msg):
      print("broadcasting message '{}' ..".format(json.dumps(msg)))
      print("To " + str(len(self.clients)) + " clients")
      for c in self.clients:
         c.sendMessage(json.dumps(msg))
         print("message sent to {}".format(c.peer))


class WebResource(resource.Resource):
    isLeaf = True
    def render_GET(self, request):
        return "gifFactory"
    def render_POST(self, request):
      jresult = json.loads(request.content.read())
      factory.broadcast(jresult)
      command = "curl " + jresult["url"] + " > gifs/" + jresult["url"].split("/")[-1] + " &"
      os.system(command)
      return json.dumps({"status":"1"})


if __name__ == '__main__':

   import sys

   from twisted.python import log
   from twisted.internet import reactor

   os.system("mkdir gifs")

   log.startLogging(sys.stdout)

   factory = PostableSocketFactory("ws://localhost:9000", debug = False)
   factory.protocol = SocketProtocol
   
   site = server.Site(WebResource())

   reactor.listenTCP(8080, site)
   reactor.listenTCP(9000, factory)
   reactor.run()
