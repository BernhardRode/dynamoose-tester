# DynamoDB Test


To create the test pod

```bash
kubectl apply -f pod.yaml
kubectl exec -it ubuntu -- /bin/bash
/bin/entrypoint.sh
source ~/.bashrc && cd /root/dynamoose-tester && npm start
```

To delete the test pod

```bash
kubectl delete -f pod.yaml
```
