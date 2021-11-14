;; Ring documentation
;; https://github.com/ring-clojure/ring/wiki
;; Compojure documentation
;; https://github.com/weavejester/compojure/wiki

(ns api.core
  (:require [ring.adapter.jetty :as jetty]
            [compojure.core :refer [defroutes, GET, POST, PUT, DELETE]]
            [compojure.route :as route]
            [ring.middleware.reload :refer [wrap-reload]]
            [ring.middleware.json :refer [wrap-json-body, wrap-json-response]]
            [ring.middleware.multipart-params :refer [wrap-multipart-params]]
            [api.endpoints.file :refer [
              getFilenames, 
              getFile, 
              createFile,
              deleteFile,
              saveFile,
              buildFile,
              flashFile]]
            [api.endpoints.mcuLibs :refer [getMCULibs]]
            [api.middleware.logger :refer [logger]]))

;; TODO (if and when using JSON)
;; Schema + validation
(defroutes api
  (GET "/mcuLibs" request
    (getMCULibs))
  (GET "/filenames" request 
    (getFilenames))
  (GET "/file/:filename" request
    (let [filename (get (get request :route-params) :filename)]
      (getFile filename)))
  (POST "/file/:filename" request
    (let [filename (get (get request :route-params) :filename)]
      (createFile filename)))
  (DELETE "/file/:filename" request
    (let [filename (get (get request :route-params) :filename)]
      (deleteFile filename)))
  (PUT "/file/save/:filename" request
    (let [filename (get (get request :route-params) :filename)
          file (get (get request :multipart-params) "file")]
      (saveFile filename file)))
  (PUT "/file/build/:filename" request
    (let [filename (get (get request :route-params) :filename)
          file (get (get request :multipart-params) "file")]
      (buildFile)))
  (PUT "/file/flash/:filename" request
    (let [filename (get (get request :route-params) :filename)
          file (get (get request :multipart-params) "file")]
      (flashFile)))
  (route/not-found "<h1>Page not found</h1>"))

(def middleware
  (-> api
      wrap-multipart-params
      wrap-json-body
      wrap-json-response
      wrap-reload
      logger))

(defn -main
  []
  (jetty/run-jetty middleware {:port 9090}))