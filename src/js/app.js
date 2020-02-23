App = {
  web3Provider: null,
  contracts: {},

  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {
    // Initialize web3 and set the provider to the testRPC.
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // set the provider you want from Web3.providers
      App.web3Provider = new Web3.providers.HttpProvider('http://127.0.0.1:9545');
      web3 = new Web3(App.web3Provider);
    }

    return App.initContract();
  },

  initContract: function() {
    $.getJSON('Crud.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract.
      var Crud = data;
      App.contracts.Crud = TruffleContract(Crud);

      // Set the provider for our contract.
      App.contracts.Crud.setProvider(App.web3Provider);

      // Use our contract to retieve and mark the adopted pets.
      return App.getBalances();
    });

    return App.handleTransfer();
  },

  bindEvents: function() {
    $(document).on(App.handleTransfer);
    console.log($createResult, 'done' )
  },

  handleTransfer: function(event)                                          {
    event.preventDefault();
    const $create = document.getElementById('create');
    const $createResult = document.getElementById('create-result');
    const $read = document.getElementById('read');
  const $readResult = document.getElementById('read-result');
  const $edit = document.getElementById('edit');
  const $editResult = document.getElementById('edit-result');
  const $delete = document.getElementById('delete');
  const $deleteResult = document.getElementById('delete-result');
  var name = parseInt($('create').val());
  var marks = parseInt($('marks').val());
  console.log('name' + name + 'tt to'  );
    let accounts = [];
    

  $create.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = e.target.elements[0].value;
    Crud.methods.create(name).send({from: accounts[0]})
    .then(result => {
      $createResult.innerHTML = `New user ${name} successfully created`;
    })
    .catch(_e => {
      $createResult.innerHTML = `Ooops... there was an error while trying to create a new user...`;
    });
  });
  $read.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = e.target.elements[0].value;
    Crud.methods.read(id).call()
    .then(result => {
      $readResult.innerHTML = `Id: ${result[0]} Name: ${result[1]}`;
    })
    .catch(_e => {
      $readResult.innerHTML = `Ooops... there was an error while trying to read user ${id}`;
    });
  });
  $edit.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = e.target.elements[0].value;
    const name = e.target.elements[1].value;
    Crud.methods.update(id, name).send({from: accounts[0]})
    .then(result => {
      $editResult.innerHTML = `Changed name of user ${id} to ${name}`;
    })
    .catch(_e => {
      $editResult.innerHTML = `Ooops... there was an error while trying to update name of user ${id} to ${name}`;
      });
     });
     $delete.addEventListener('submit', (e) => {
        e.preventDefault();
            const id = e.target.elements[0].value;
            Crud.methods.destroy(id).send({from: accounts[0]})
            .then(result => {
        $deleteResult.innerHTML = `Deleted user ${id}`;
        })
        .catch(_e => {
          $deleteResult.innerHTML = `Ooops... there was an error while trying to delete iser ${id}`;
        });
  

    
      $(function() {
      $(window).load(function() {
        App.init();
    });
  });
});
  },
};
