(defproject api "0.1.0-SNAPSHOT"
  :description "AVR-FlashTool API"
  :url "http://example.com/FIXME"
  :license {:name "EPL-2.0 OR GPL-2.0-or-later WITH Classpath-exception-2.0"
            :url "https://www.eclipse.org/legal/epl-2.0/"}
  :plugins [[lein-ring "0.12.5"]]
  :ring {:handler api.core/middleware}
  :dependencies [[org.clojure/clojure "1.10.1"]
                 [org.clojure/data.json "2.4.0"]
                 [ring/ring-core "1.8.1"]
                 [ring/ring-jetty-adapter "1.8.1"]
                 [ring/ring-devel "1.8.1"]
                 [ring/ring-json "0.5.1"]
                 [compojure "1.6.2"]]
  :main files.core)