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
            [ring.util.response :refer [bad-request]]
            [api.endpoints.file :refer [
              getFilenames, 
              getFile, 
              createFile,
              deleteFile,
              saveFile,
              buildFile,
              flashFile]]
            [api.endpoints.mcuLibs :refer [getMCULibs]]
            [api.middleware.logger :refer [logger]]
            [api.lib.validator :refer [isValidFilename, isValidFileData]]))

;; TODO (if and when using JSON)
;; Schema + validation
(defroutes api
  
  (GET "/mcuLibs" request
    (getMCULibs))
  
  (GET "/filenames" request 
    (getFilenames))
  
  (GET "/file/:filename" request
    (let [filename (get (get request :route-params) :filename)]
      (cond
        (not (isValidFilename filename)) (bad-request "Bad filename")
        :else (getFile filename))))
  
  (POST "/file/:filename" request
    (let [filename (get (get request :route-params) :filename)]
      (cond
        (not (isValidFilename filename)) (bad-request "Bad filename")
        :else (createFile filename))))

  (DELETE "/file/:filename" request
    (let [filename (get (get request :route-params) :filename)]
      (cond
        (not (isValidFilename filename)) (bad-request "Bad filename")
        :else (deleteFile filename))))
  
  (PUT "/file/save/:filename" request
    (let [filename (get (get request :route-params) :filename)
          data (get-in request [:body "data"])]
      (cond
        (not (isValidFilename filename)) (bad-request "Bad filename")
        (not (isValidFileData data)) (bad-request "Bad file data")
        :else (saveFile filename data))))
  
  (PUT "/file/build/:filename" request
    (let [filename (get (get request :route-params) :filename)
          data (get-in request [:body "data"])]
      (cond
        (not (isValidFilename filename)) (bad-request "Bad filename")
        (not (isValidFileData data)) (bad-request "Bad file data")
        :else (buildFile filename data))))
  
  (PUT "/file/flash/:filename" request
    (let [filename (get (get request :route-params) :filename)
          data (get-in request [:body "data"])]
      (cond
        (not (isValidFilename filename)) (bad-request "Bad filename")
        (not (isValidFileData data)) (bad-request "Bad file data")
        :else (flashFile filename data))))
  
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