(ns api.endpoints.mcuLibs
  (:require
   [clojure.java.io :as io]
   [ring.util.response :refer [file-response, response, bad-request]]))


(defn getMCULibs []
    (response {}))

